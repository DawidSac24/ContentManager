const DB_NAME = "MyAppDB";
const DB_VERSION = 2;

export function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;

      if (!db.objectStoreNames.contains("contexts")) {
        db.createObjectStore("contexts", { keyPath: "id" });
      }

      if (!db.objectStoreNames.contains("pages")) {
        const pagesStore = db.createObjectStore("pages", { keyPath: "id" });
        pagesStore.createIndex("contextId", "contextId", { unique: false });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}
