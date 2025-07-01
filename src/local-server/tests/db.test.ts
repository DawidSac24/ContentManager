import "fake-indexeddb/auto";

import { openDatabase } from "../services/db.service";

beforeEach((done) => {
  const deleteRequest = indexedDB.deleteDatabase("contexts");
  deleteRequest.onsuccess = () => done();
  deleteRequest.onerror = () => done(deleteRequest.error);
});

test("openDatabase creates expected object stores", async () => {
  const db = await openDatabase();

  expect(db).toBeDefined();
  expect(db.objectStoreNames.contains("contexts")).toBe(true);
  expect(db.objectStoreNames.contains("pages")).toBe(true);
  expect(db.objectStoreNames.contains("contextPageLinks")).toBe(true);

  db.close();
});
