import {
  Context,
  MergingContextWithPages,
  NewContext,
} from "../models/context.model";
import { NewPage } from "../models/page.model";
import { ContextV1 } from "../models/old.model";

import { ContextController } from "../controllers/contexts.controller";
import { PageController } from "../controllers/pages.controller";

const DB_NAME = "contexts";
const DB_VERSION = 3;

export function createDatabase(request: IDBOpenDBRequest): void {
  const db = request.result;

  // Contexts store
  if (!db.objectStoreNames.contains("contexts")) {
    db.createObjectStore("contexts", {
      keyPath: "id",
      autoIncrement: true,
    });
  }

  // Pages store
  if (!db.objectStoreNames.contains("pages")) {
    db.createObjectStore("pages", {
      keyPath: "id",
      autoIncrement: true,
    });
  }

  // Join table: contextPageLinks
  if (!db.objectStoreNames.contains("contextPageLinks")) {
    const linkStore = db.createObjectStore("contextPageLinks", {
      keyPath: "id",
      autoIncrement: true,
    });

    // Indexes for querying
    linkStore.createIndex("contextId", "contextId", { unique: false });
    linkStore.createIndex("pageId", "pageId", { unique: false });

    // Unique index for contextId and pageId combination
    linkStore.createIndex("context_page_unique", ["contextId", "pageId"], {
      unique: true,
    });
  }
}

/**
 * Opens the IndexedDB database.
 * if the database doesn't exist, it will be created with this.createDatabase(request).
 * @param dbName The name of the database.
 * @param version The version of the database.
 * @returns A promise that resolves to the opened IDBDatabase object.
 */
export async function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = async function (event) {
      const db = request.result;
      const transaction = request.transaction!;
      const oldVersion = event.oldVersion;

      if (oldVersion === 0 || !db.objectStoreNames.contains("contexts")) {
        // If the database is being created for the first time, create the stores
        createDatabase(request);
      } else if (oldVersion < DB_VERSION) {
        const mergingData = await updateDatabase(db, transaction, oldVersion);
        await createDatabase(request);
        await mergeData(mergingData);
      }
    };

    request.onsuccess = function () {
      resolve(request.result);
    };

    request.onerror = function () {
      reject(new Error(`Error opening database: ${request.error}`));
    };
  });
}

async function updateDatabase(
  db: IDBDatabase,
  transaction: IDBTransaction,
  oldVersion: number
): Promise<MergingContextWithPages[]> {
  return new Promise((resolve, reject) => {
    if (oldVersion < 1 || !db.objectStoreNames.contains("contexts")) {
      return false;
    }
    // NOTE : Skipped version 2 as no changes were specified
    // -> no need to handle version 2 explicitly

    /** Update logic for version 3
     * retreiving all old data
     * converting them to the new structure
     * then deleting the old database
     * returning the new structure to allow data merge
     */
    if (oldVersion < 3) {
      const contextsStore = transaction.objectStore("contexts");
      // Get all contexts from the old store
      const request = contextsStore.getAll();

      let oldContexts: ContextV1[];
      const mergingData: MergingContextWithPages[] = [];

      request.onsuccess = async function () {
        oldContexts = request.result;
        // convert old contexts to new structure
        for (const context of oldContexts) {
          const newContext: NewContext = {
            name: context.name,
          };
          const newPages: NewPage[] = [];

          // Convert old pages to new structure
          context.pages.forEach((page) => {
            const newPage: NewPage = {
              title: page.title,
              url: page.url,
            };
            newPages.push(newPage);
          });
          mergingData.push({
            context: newContext,
            pages: newPages,
          });
          resolve(mergingData);
        }

        request.onerror = function () {
          console.error("Error retrieving old contexts:", request.error);
          reject(`Error retrieving old contexts: ${request.error}`);
        };
      };
    }
  });
}

async function mergeData(
  mergingData: MergingContextWithPages[]
): Promise<void> {
  const contextController = ContextController.getInstance();
  const pageController = PageController.getInstance();

  for (const data of mergingData) {
    const { context, pages } = data;

    // Add the new context
    const addedContext: Context = await contextController.addContext(context);

    // adding the new pages, the pagesController will handle the creation of context-page links
    await pageController.add(pages, addedContext.id);
  }
}
