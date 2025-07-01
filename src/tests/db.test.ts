import { openDatabase } from "../services/db.service"; // Adjust the path to your module

describe("IndexedDB Migration to Version 3", () => {
  const DB_NAME = "contexts";

  beforeEach(async () => {
    // Clear any existing DB before each test
    const databases = await indexedDB.databases?.();
    if (databases) {
      for (const db of databases) {
        indexedDB.deleteDatabase(db.name!);
      }
    }
  });

  it("should create the database with version 3 and required stores", async () => {
    const db = await openDatabase();

    expect(db.version).toBe(3);
    expect(db.objectStoreNames.contains("contexts")).toBe(true);
    expect(db.objectStoreNames.contains("pages")).toBe(true);
    expect(db.objectStoreNames.contains("contextPageLinks")).toBe(true);

    db.close();
  });

  it("should migrate data from version 1 to 3", async () => {
    // Step 1: Create version 1 DB manually
    const requestV1 = indexedDB.open(DB_NAME, 1);
    requestV1.onupgradeneeded = function () {
      const db = requestV1.result;
      const store = db.createObjectStore("contexts", {
        keyPath: "id",
        autoIncrement: true,
      });
      store.add({
        id: 1,
        name: "Old Context",
        pages: [{ title: "Page 1", url: "https://example.com" }],
      });
    };

    await new Promise((resolve, reject) => {
      requestV1.onsuccess = () => {
        requestV1.result.close();
        resolve(null);
      };
      requestV1.onerror = reject;
    });

    // Step 2: Open with version 3 and trigger migration
    const db = await openDatabase();

    expect(db.version).toBe(3);
    expect(db.objectStoreNames.contains("contexts")).toBe(true);
    expect(db.objectStoreNames.contains("pages")).toBe(true);
    expect(db.objectStoreNames.contains("contextPageLinks")).toBe(true);

    db.close();
  });
});
