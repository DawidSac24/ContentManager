const DB_NAME = "contexts";
const DB_VERSION = 2;

export function createDatabase(request: IDBOpenDBRequest): void {
  const db = request.result;

  if (!db.objectStoreNames.contains("contexts")) {
    db.createObjectStore("contexts", {
      keyPath: "id",
      autoIncrement: true,
    });
  }

  if (!db.objectStoreNames.contains("pages")) {
    const pagesStore = db.createObjectStore("pages", {
      keyPath: "id",
      autoIncrement: true,
    });
    pagesStore.createIndex("contextId", "contextId", { multiEntry: true });
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
