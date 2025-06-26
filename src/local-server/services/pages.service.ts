import { NewPage, Page } from "../models/page.model";
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

  public async addPages(pages: NewPage[]): Promise<Page[]> {
    const db = await openDatabase();

    return new Promise((resolve, reject) => {
      const transaction = db.transaction("pages", "readwrite");
      const objectStore = transaction.objectStore("pages");

      const result: Page[] = [];

      pages.forEach((page) => {
        const addRequest = objectStore.put(page);

        addRequest.onsuccess = () => {
          result.push({ ...page, id: addRequest.result as number });
        };

        addRequest.onerror = () => {
          reject(new Error(`Error adding page: ${addRequest.error}`));
        };
      });

      transaction.oncomplete = () => {
        resolve(result);
      };

      transaction.onerror = () => {
        reject(new Error(`Transaction error: ${transaction.error}`));
      };
    });
  }

  public async getOpenPages(): Promise<Page[]> {
    return new Promise((resolve, reject) => {
      chrome.tabs.query({ currentWindow: true }, (tabs) => {
        try {
          const pages: Page[] = tabs.map((tab) => ({
            id: tab.id || 0, // Use 0 if id is undefined
            title: tab.title || "No Title",
            url: tab.url || "No URL",
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
        id: tab.id || 0, // Use 0 if id is undefined
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

  public async deleteByContextId(contextId: number): Promise<void> {
    const db = await openDatabase();

    return new Promise((resolve, reject) => {
      const transaction = db.transaction("contextPageLinks", "readwrite");
      const objectStore = transaction.objectStore("contextPageLinks");
      const index = objectStore.index("contextId");

      const getRequest = index.getAll(contextId);

      getRequest.onsuccess = () => {
        const links = getRequest.result as { id: number }[];

        if (links.length === 0) {
          resolve();
          return;
        }

        let remaining = links.length;
        let hasError = false;

        links.forEach((link) => {
          const deleteRequest = objectStore.delete(link.id);

          deleteRequest.onsuccess = () => {
            remaining--;
            if (remaining === 0 && !hasError) {
              resolve();
            }
          };

          deleteRequest.onerror = () => {
            hasError = true;
            reject(new Error(`Error deleting link with ID ${link.id}`));
          };
        });
      };

      getRequest.onerror = () => {
        reject(
          new Error(
            `Error getting links for context ID ${contextId}: ${getRequest.error}`
          )
        );
      };
    });
  }
}
