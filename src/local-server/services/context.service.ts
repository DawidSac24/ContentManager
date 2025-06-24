import { Context } from "../models/context.model";
import { openDatabase } from "./db.service";

/**
 * Singleton service for managing contexts in IndexedDB.
 * This service provides methods to create, read, update, and delete contexts,
 * as well as assign pages to contexts.
 */
export class ContextService {
  private static instance: ContextService;

  private constructor() {}

  public static getInstance(): ContextService {
    if (!ContextService.instance) {
      ContextService.instance = new ContextService();
    }
    return ContextService.instance;
  }

  /**
   * Retrieves all contexts from the database.
   * @returns A promise that resolves to an array of Context objects.
   */
  public async getAllContexts(): Promise<Context[]> {
    const db = await openDatabase();

    return new Promise((resolve, reject) => {
      const transaction = db.transaction("contexts", "readonly");
      const objectStore = transaction.objectStore("contexts");
      const getAllRequest = objectStore.getAll();

      getAllRequest.onsuccess = () => {
        resolve(getAllRequest.result as Context[]);
      };

      getAllRequest.onerror = function () {
        reject(new Error(`Error getting contexts: ${getAllRequest.error}`));
      };
    });
  }

  /**
   * Retrieves a context by its ID from the database.
   * @param id The ID of the context to retrieve.
   * @returns A promise that resolves to the Context object.
   */
  public async getById(id: number): Promise<Context> {
    const db = await openDatabase();

    return new Promise((resolve, reject) => {
      const transaction = db.transaction("contexts", "readonly");
      const objectStore = transaction.objectStore("contexts");
      const getRequest = objectStore.get(id);

      getRequest.onsuccess = () => {
        resolve(getRequest.result as Context);
      };

      getRequest.onerror = function () {
        reject(new Error(`Error getting context: ${getRequest.error}`));
      };
    });
  }

  /**
   * Adds a new context to the database.
   * @param context The Context object to add.
   * @returns A promise that resolves to the added Context object with its ID.
   */
  public async addContext(context: Context): Promise<Context> {
    const db = await openDatabase();

    return new Promise((resolve, reject) => {
      const transaction = db.transaction("contexts", "readwrite");
      const objectStore = transaction.objectStore("contexts");
      const putRequest = objectStore.put(context);

      putRequest.onsuccess = () => {
        const resultId = putRequest.result as number;
        const result = { ...context, id: resultId };
        resolve(result);
      };

      putRequest.onerror = () => {
        reject(new Error(`Error adding context: ${putRequest.error}`));
      };
    });
  }

  /**
   * Updates an existing context in the database.
   * @param context The Context object to update, creates one if it doesn't exist.
   * @returns A promise that resolves to the updated Context object.
   */
  public async putContext(context: Context): Promise<Context> {
    const db = await openDatabase();

    return new Promise((resolve, reject) => {
      try {
        const transaction = db.transaction("contexts", "readwrite");
        const objectStore = transaction.objectStore("contexts");

        // This assumes your objectStore uses "id" as keyPath
        const putRequest = objectStore.put(context);

        putRequest.onsuccess = () => {
          resolve(context);
        };

        putRequest.onerror = () => {
          console.error("Put request error", putRequest.error);
          reject(
            new Error(`Error updating context: ${putRequest.error?.message}`)
          );
        };
      } catch (e) {
        console.error("Transaction failed", e);
        reject(e);
      }
    });
  }

  /**
   * Deletes a context by its ID from the database.
   * @param id The ID of the context to delete.
   * @returns A promise that resolves when the context is deleted.
   */
  public async deleteContext(id: number): Promise<void> {
    const db = await openDatabase();

    return new Promise((resolve, reject) => {
      const transaction = db.transaction("contexts", "readwrite");
      const objectStore = transaction.objectStore("contexts");
      const deleteRequest = objectStore.delete(id);

      deleteRequest.onsuccess = () => {
        resolve();
      };

      deleteRequest.onerror = () => {
        reject(new Error(`Error deleting context: ${deleteRequest.error}`));
      };
    });
  }
}
