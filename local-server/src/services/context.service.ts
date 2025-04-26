import { Context, NewContext } from "../models/context.model";
import { getDatabase } from "./db.service";
import { LoggerService } from "./logger.service";

export class ContextService {
  async add(newContext: NewContext): Promise<number> {
    LoggerService.info(`Adding context: ${newContext.name}`);

    const db = await getDatabase();
    const tx = db.transaction("contexts", "readwrite");
    const store = tx.objectStore("contexts");

    const context: Context = {
      name: newContext.name,
      pages: [],
      isDeleted: false,
    };

    const id = await store.add(context);
    await tx.done; // Ensure the transaction complete
    // s
    LoggerService.info(`Context added with id: ${id}`);
    return id;
  }

  async getAll(): Promise<Context[]> {
    LoggerService.info(`Getting all contexts`);

    const db = await getDatabase();
    const tx = db.transaction("contexts", "readonly");
    const store = tx.objectStore("contexts");
    const allContexts = await store.getAll();

    LoggerService.info(`Found ${allContexts.length} contexts`);
    return allContexts;
  }

  async getById(id: number): Promise<Context | undefined> {
    LoggerService.info(`Getting context by id: ${id}`);

    const db = await getDatabase();
    const tx = db.transaction("contexts", "readonly");
    const store = tx.objectStore("contexts");
    const index = store.index("by-id");
    const context = await index.get(id); // Get the first record where 'title' matches title

    LoggerService.info(`Found context: ${context?.name}`);
    return context;
  }

  async update(updatedContext: Context): Promise<void> {
    LoggerService.info(`Updating context: ${updatedContext.name}`);

    const db = await getDatabase();
    const tx = db.transaction("contexts", "readwrite");
    const store = tx.objectStore("contexts");
    await store.put(updatedContext); // 'put' will update if the key exists, or add if it doesn't
    await tx.done;

    LoggerService.info(`Context updated: ${updatedContext.name}`);
  }

  async softDelete(id: number): Promise<void> {
    LoggerService.info(`Soft deleting context with id: ${id}`);

    const db = await getDatabase();
    const tx = db.transaction("contexts", "readwrite");
    const store = tx.objectStore("contexts");

    const updatedContext: Context | undefined = await this.getById(id);

    if (!updatedContext) {
      LoggerService.error(`Context with id ${id} not found`);
      throw new Error(`Context with id ${id} not found`);
    }

    updatedContext.isDeleted = true;

    await store.put(updatedContext); // 'put' will update if the key exists, or add if it doesn't
    await tx.done;

    LoggerService.info(`Context soft deleted: ${updatedContext.name}`);
  }

  async delete(id: number): Promise<void> {
    LoggerService.info(`Deleting context with id: ${id}`);

    const db = await getDatabase();
    const tx = db.transaction("contexts", "readwrite");
    const store = tx.objectStore("contexts");
    await store.delete(id);
    await tx.done;

    LoggerService.info(`Context deleted: ${id}`);
  }
}
