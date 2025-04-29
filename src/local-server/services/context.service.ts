import { Context } from "../models/context.model";
import { LoggerService } from "./logger.service";

export class ContextService {
  private static instance: ContextService;
  private indexDb = window.indexedDB;

  private constructor() {}

  public static getInstance(): ContextService {
    if (!ContextService.instance) {
      ContextService.instance = new ContextService();
    }
    return ContextService.instance;
  }

  private async createDatabase(
    request: IDBOpenDBRequest,
    version: number
  ): Promise<IDBDatabase | undefined> {
    const db = request.result;

    if (!db.objectStoreNames.contains("contexts")) {
      // Create an object store for contexts if it doesn't exist
      db.createObjectStore("contexts", {
        keyPath: "id",
        autoIncrement: true,
      });
    }

    return db;
  }

  private async openDatabase(
    dbName: string,
    version: number
  ): Promise<IDBDatabase | undefined> {
    LoggerService.info(`Opening database: ${dbName}, version: ${version}`);

    const request = this.indexDb.open(dbName, version);
    let result: IDBDatabase | undefined = undefined;

    request.onupgradeneeded = this.createDatabase.bind(this, request, version);

    request.onsuccess = function () {
      const db = request.result;
      result = db;
    };

    request.onerror = function () {
      LoggerService.error(`Error opening database: ${request.error}`);
    };

    return result;
  }

  public async getContexts(): Promise<Context[] | undefined> {
    const db = await this.openDatabase("contextDB", 1);
    if (!db) {
      LoggerService.error("Database not opened successfully.");
      return undefined;
    }

    const transaction = db.transaction("contexts", "readonly");
    const objectStore = transaction.objectStore("contexts");
    const getAllRequest = objectStore.getAll();
    let contexts: Context[] | undefined = undefined;

    getAllRequest.onsuccess = function () {
      contexts = getAllRequest.result as Context[];
    };
    getAllRequest.onerror = function () {
      LoggerService.error(`Error getting contexts: ${getAllRequest.error}`);
    };
  }
}
