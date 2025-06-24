import { Page } from "../models/page.model";
import { openDatabase } from "./db.service";

export class PagesService {
  private static instance: PagesService;

  private constructor() {}

  public static getInstance(): PagesService {
    if (!PagesService.instance) {
      PagesService.instance = new PagesService();
    }
    return PagesService.instance;
  }

  public async getById(id: number): Promise<Page> {
    const db = await openDatabase();

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

  public async getAllByContextId(contextId: number): Promise<Page[]> {
    const db = await openDatabase();

    return new Promise((resolve, reject) => {
      const transaction = db.transaction("pages", "readonly");
      const objectStore = transaction.objectStore("pages");
      const index = objectStore.index("contextId");
      const getAllRequest = index.getAll(contextId);

      getAllRequest.onsuccess = () => {
        resolve(getAllRequest.result as Page[]);
      };

      getAllRequest.onerror = function () {
        reject(
          new Error(`Error getting pages by context ID: ${getAllRequest.error}`)
        );
      };
    });
  }

  public async saveOpenPages(contextId: number): Promise<Page[]> {
    return new Promise((resolve, reject) => {
      chrome.tabs.query({ currentWindow: true }, (tabs) => {
        try {
          const pages: Page[] = tabs.map((tab) => ({
            id: tab.id,
            title: tab.title || "No Title",
            url: tab.url || "No URL",
            contextId: contextId, // Assign the provided context ID
          }));
          resolve(pages);
        } catch (err) {
          reject(err);
        }
      });
    });
  }

  public async load(pages: Page[]): Promise<Page[]> {
    try {
      // Close all tabs except one
      const tabToClose = await this.closeAllPages();

      // Open all pages in new tabs
      const openedPages = await this.openPages(pages);

      // Close the last remaining tab
      if (tabToClose.id !== undefined) {
        chrome.tabs.remove(tabToClose.id);
      }

      // Return the opened pages
      return openedPages.map((tab) => ({
        id: tab.id || undefined,
        url: tab.url || "",
        title: tab.title || "",
        contextId: pages[0].contextId, // Assuming all pages have the same contextId
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
