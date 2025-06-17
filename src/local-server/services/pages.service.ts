import { Page } from "../models/page.model";

export class PagesService {
  private static instance: PagesService;
  // private indexDb = window.indexedDB;
  // private dbName = "contexts";
  // private dbVersion = 1;

  private constructor() {}

  public static getInstance(): PagesService {
    if (!PagesService.instance) {
      PagesService.instance = new PagesService();
    }
    return PagesService.instance;
  }

  public async getAllOpenTabs(): Promise<Page[]> {
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
      const tabToClose = await this.closeAllTabs();

      // Open all pages in new tabs
      const openedTabs = await this.openTabs(pages);

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

  private closeAllTabs(): Promise<chrome.tabs.Tab> {
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

  private openTabs(pages: Page[]) {
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
