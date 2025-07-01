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

export function createDatabaseSchema(db: IDBDatabase): void {
  if (!db.objectStoreNames.contains("contexts")) {
    db.createObjectStore("contexts", {
      keyPath: "id",
      autoIncrement: true,
    });
  }

  if (!db.objectStoreNames.contains("pages")) {
    db.createObjectStore("pages", {
      keyPath: "id",
      autoIncrement: true,
    });
  }

  if (!db.objectStoreNames.contains("contextPageLinks")) {
    const linkStore = db.createObjectStore("contextPageLinks", {
      keyPath: "id",
      autoIncrement: true,
    });

    linkStore.createIndex("contextId", "contextId", { unique: false });
    linkStore.createIndex("pageId", "pageId", { unique: false });
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

      if (oldVersion === 0) {
        createDatabaseSchema(db);
      } else if (oldVersion < DB_VERSION) {
        const mergingData = await updateDatabase(db, transaction, oldVersion);
        deleteStores(db);
        createDatabaseSchema(db);
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

/**
 * Updates the database schema and migrates data if necessary.
 * This function handles the migration from version 1 to version 3.
 * @param db The IDBDatabase object.
 * @param transaction The IDBTransaction object.
 * @param oldVersion The old version of the database.
 * @returns A promise that resolves to an array of MergingContextWithPages objects.
 */
export async function updateDatabase(
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

    if (oldVersion < 3) {
      const contextsStore = transaction.objectStore("contexts");
      // Get all contexts from the old store
      const request = contextsStore.getAll();

      let oldContexts: ContextV1[];
      const mergingData: MergingContextWithPages[] = [];

      request.onsuccess = async function () {
        oldContexts = request.result;

        for (const context of oldContexts) {
          const newContext: NewContext = { name: context.name };
          const newPages: NewPage[] = context.pages.map((page) => ({
            title: page.title,
            url: page.url,
          }));

          mergingData.push({ context: newContext, pages: newPages });
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

function deleteStores(db: IDBDatabase): void {
  try {
    if (db.objectStoreNames.contains("contexts")) {
      db.deleteObjectStore("contexts");
    }
    if (db.objectStoreNames.contains("pages")) {
      db.deleteObjectStore("pages");
    }
    if (db.objectStoreNames.contains("contextPageLinks")) {
      db.deleteObjectStore("contextPageLinks");
    }
  } catch (error) {
    console.error("Error deleting object stores:", error);
  }
}

module.exports = {
  createDatabaseSchema,
  openDatabase,
  updateDatabase,
  mergeData,
  deleteStores,
};
