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

    request.onupgradeneeded = () => {
      createDatabase(request);
    };

    request.onsuccess = function () {
      resolve(request.result);
    };

    request.onerror = function () {
      reject(new Error(`Error opening database: ${request.error}`));
    };
  });
}
