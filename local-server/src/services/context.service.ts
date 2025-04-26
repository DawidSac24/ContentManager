import { Context, NewContext } from "../models/context.model";
import { getDatabase } from "./db.service";

export class ContextService {
  public static async add(newContext: NewContext): Promise<Context> {
    const db = await getDatabase();
    const tx = db.transaction("contexts", "readwrite");
    const store = tx.objectStore("contexts");

    const context: Context = {
      name: newContext.name,
      pages: [],
      isDeleted: false,
    };

    const id: number = await store.add(context);
    await tx.done; // Ensure the transaction complete

    return {
      id: id,
      name: context.name,
      pages: context.pages,
      isDeleted: context.isDeleted,
    };
  }

  public static async getAll(): Promise<Context[]> {
    const db = await getDatabase();
    const tx = db.transaction("contexts", "readonly");
    const store = tx.objectStore("contexts");
    const allContexts: Context[] = await store.getAll();

    return allContexts;
  }

  public static async getById(id: number): Promise<Context | undefined> {
    const db = await getDatabase();
    const tx = db.transaction("contexts", "readonly");
    const store = tx.objectStore("contexts");
    const index = store.index("by-id");
    const context: Context | undefined = await index.get(id); // Get the first record where 'title' matches title

    return context;
  }

  public static async update(updatedContext: Context): Promise<void> {
    const db = await getDatabase();
    const tx = db.transaction("contexts", "readwrite");
    const store = tx.objectStore("contexts");
    await store.put(updatedContext); // 'put' will update if the key exists, or add if it doesn't
    await tx.done;
  }

  public static async softDelete(id: number): Promise<void> {
    const db = await getDatabase();
    const tx = db.transaction("contexts", "readwrite");
    const store = tx.objectStore("contexts");

    const updatedContext: Context | undefined = await this.getById(id);

    if (!updatedContext) {
      throw new Error(`Context with id ${id} not found`);
    }

    updatedContext.isDeleted = true;

    await store.put(updatedContext); // 'put' will update if the key exists, or add if it doesn't
    await tx.done;
  }

  public static async delete(id: number): Promise<void> {
    const db = await getDatabase();
    const tx = db.transaction("contexts", "readwrite");
    const store = tx.objectStore("contexts");
    await store.delete(id);
    await tx.done;
  }
}
