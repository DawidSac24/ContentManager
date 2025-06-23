import { Page } from "../models/page.model";

export class PagesService {
  private static instance: PagesService;
  private indexDb = window.indexedDB;
  private dbName = "pages";
  private dbVersion = 1;

  private constructor() {}

  public static getInstance(): PagesService {
    if (!PagesService.instance) {
      PagesService.instance = new PagesService();
    }
    return PagesService.instance;
  }

  /**
   * Creates a new IndexedDB database if it doesn't exist.
   * @param request The IDBOpenDBRequest object for the database.
   */
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

  /**
   * Opens the IndexedDB database.
   * if the database doesn't exist, it will be created with this.createDatabase(request).
   * @param dbName The name of the database.
   * @param version The version of the database.
   * @returns A promise that resolves to the opened IDBDatabase object.
   */
  private async openDatabase(
    dbName: string,
    version: number
  ): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const request = this.indexDb.open(dbName, version);

      request.onupgradeneeded = () => {
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

  public async getById(id: number): Promise<Page> {
    const db = await this.openDatabase(this.dbName, this.dbVersion);

    return new Promise((resolve, reject) => {
      const transaction = db.transaction("pages", "readonly");
      const objectStore = transaction.objectStore("pages");
      const getRequest = objectStore.get(id);

      getRequest.onsuccess = () => {
        resolve(getRequest.result as Page);
      };

      getRequest.onerror = function () {
        reject(new Error(`Error getting page: ${getRequest.error}`));
      };
    });
  }

  public async getAllOpenPages(): Promise<Page[]> {
    return new Promise((resolve, reject) => {
      try {
        chrome.tabs.query({ currentWindow: true }, (tabs) => {
          const pages: Page[] = tabs.map((tab) => ({
            id: tab.id,
            title: tab.title || "No Title",
            url: tab.url || "No URL",
          }));
          resolve(pages);
        });
      } catch (err) {
        reject(err);
      }
    });
  }

  public async loadPages(pages: Page[]): Promise<Page[]> {
    try {
      // Close all tabs except one
      const tabToClose = await this.closeAllPages();

      // Open all pages in new tabs
      const openedTabs = await this.openPages(pages);

      // Close the last remaining tab
      if (tabToClose.id !== undefined) {
        chrome.tabs.remove(tabToClose.id);
      }

      // Return the opened pages
      return openedTabs.map((tab) => ({
        id: tab.id || undefined,
        url: tab.url || "",
        title: tab.title || "",
      }));
    } catch (error) {
      return Promise.reject(error);
    }
  }

  private closeAllPages(): Promise<chrome.tabs.Tab> {
    return new Promise((resolve, reject) => {
      chrome.tabs.query({ currentWindow: true }, (tabs) => {
        if (chrome.runtime.lastError) {
          return reject(chrome.runtime.lastError);
        }

        if (tabs.length <= 1) {
          return resolve(tabs[0]); // Only one tab, nothing to close
        }

        const tabToKeep = tabs[0];

        const tabsToClose = tabs
          .filter((tab) => tab.id !== tabToKeep.id)
          .map((tab) => tab.id!)
          .filter((id) => id !== undefined);

        chrome.tabs.remove(tabsToClose, () => {
          if (chrome.runtime.lastError) {
            return reject(chrome.runtime.lastError);
          }
          resolve(tabToKeep);
        });
      });
    });
  }

  private openPages(pages: Page[]) {
    return Promise.all(
      pages.map(
        (page) =>
          new Promise<chrome.tabs.Tab>((resolve, reject) => {
            chrome.tabs.create({ url: page.url, active: false }, (tab) => {
              if (chrome.runtime.lastError || !tab) {
                return reject(chrome.runtime.lastError);
              }
              resolve(tab);
            });
          })
      )
    );
  }
}
