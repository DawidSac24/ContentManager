import { openDB, DBSchema, IDBPDatabase } from "idb";
import { Context } from "../models/context.model";
import { Page } from "../models/page.model";
import { DB } from "../models/db.model";

let dbPromise: Promise<IDBPDatabase<DB>> | null = null;

async function getDatabase(): Promise<IDBPDatabase<DB>> {
  if (!dbPromise) {
    dbPromise = openDB<DB>("contexts-database", 1, {
      upgrade(db, oldVersion, newVersion, transaction) {
        // Create contexts store with auto-increment ID
        if (!db.objectStoreNames.contains("contexts")) {
          const contextsStore = db.createObjectStore("contexts", {
            keyPath: "id",
            autoIncrement: true,
          });
          contextsStore.createIndex("by-id", "id");
          contextsStore.createIndex("by-name", "name");
        }

        // Create pages store with auto-increment ID
        if (!db.objectStoreNames.contains("pages")) {
          const pagesStore = db.createObjectStore("pages", {
            keyPath: "id",
            autoIncrement: true,
          });
          pagesStore.createIndex("by-id", "id");
          pagesStore.createIndex("by-title", "title");
          pagesStore.createIndex("by-url", "url"); // url probably not needed !!!
        }
      },
    });
  }
  return dbPromise;
}

export { getDatabase };
