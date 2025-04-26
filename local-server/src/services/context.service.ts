import { Context, NewContext } from "../models/context.model";
import { getDatabase } from "./db.service";

async function addContext(newContext: NewContext): Promise<number> {
  const db = await getDatabase();
  const tx = db.transaction("contexts", "readwrite");
  const store = tx.objectStore("contexts");

  const context: Context = {
    name: newContext.name,
    pages: [],
  };

  const id = await store.add(context);
  await tx.done; // Ensure the transaction completes
  return id;
}

async function getAllContexts(): Promise<Context[]> {
  const db = await getDatabase();
  const tx = db.transaction("contexts", "readonly");
  const store = tx.objectStore("contexts");
  const allContexts = await store.getAll();
  return allContexts;
}

async function getContextById(id: number): Promise<Context | undefined> {
  const db = await getDatabase();
  const tx = db.transaction("contexts", "readonly");
  const store = tx.objectStore("contexts");
  const index = store.index("by-id");
  const context = await index.get(id); // Get the first record where 'title' matches title
  return context;
}

async function updateContext(updatedContext: Context): Promise<void> {
  const db = await getDatabase();
  const tx = db.transaction("contexts", "readwrite");
  const store = tx.objectStore("contexts");
  await store.put(updatedContext); // 'put' will update if the key exists, or add if it doesn't
  await tx.done;
}

async function deleteBook(id: number): Promise<void> {
  const db = await getDatabase();
  const tx = db.transaction("contexts", "readwrite");
  const store = tx.objectStore("contexts");
  await store.delete(id);
  await tx.done;
}
