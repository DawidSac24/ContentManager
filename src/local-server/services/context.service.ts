import { Context } from "../models/context.model";

export class ContextService {
  private static instance: ContextService;
  private indexDb = window.indexedDB;
  private dbName = "contexts";
  private dbVersion = 1;

  private constructor() {}

  public static getInstance(): ContextService {
    if (!ContextService.instance) {
      ContextService.instance = new ContextService();
    }
    return ContextService.instance;
  }

  private createDatabase(request: IDBOpenDBRequest): void {
    const db = request.result;

    if (!db.objectStoreNames.contains(this.dbName)) {
      // Create an object store for contexts if it doesn't exist
      db.createObjectStore(this.dbName, {
        keyPath: "id",
        autoIncrement: true,
      });
    }
  }

  private async openDatabase(
    dbName: string,
    version: number
  ): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const request = this.indexDb.open(dbName, version);

      request.onupgradeneeded = (event) => {
        this.createDatabase(request);
      };

      request.onsuccess = function () {
        resolve(request.result);
      };

      request.onerror = function () {
        reject(new Error(`Error opening database: ${request.error}`));
      };
    });
  }

  public async getContexts(): Promise<Context[]> {
    const db = await this.openDatabase(this.dbName, this.dbVersion);

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

  public async addContext(context: Context): Promise<Context | undefined> {
    const db = await this.openDatabase(this.dbName, this.dbVersion);

    return new Promise((resolve, reject) => {
      const transaction = db.transaction("contexts", "readwrite");
      const objectStore = transaction.objectStore("contexts");
      const putRequest = objectStore.put(context);

      putRequest.onsuccess = function () {
        const resultId = putRequest.result as number;
        const result = { ...context, id: resultId };
        resolve(result);
      };

      putRequest.onerror = function () {
        reject(new Error(`Error adding context: ${putRequest.error}`));
      };
    });
  }
}
