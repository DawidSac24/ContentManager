import { Page } from "../models/page.model";
import { LoggerService } from "./logger.service";

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
        chrome.tabs.query({}, (tabs) => {
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

  public async closeAllTabs(): Promise<Page[]> {
    const closedTabs: Page[] = await this.getAllOpenTabs();

    return new Promise((resolve, reject) => {
      try {
        chrome.tabs.query({}, (tabs) => {
          const tabIds = tabs
            .map((tab) => tab.id)
            .filter((id) => id !== undefined);
          if (tabIds.length > 0) {
            chrome.tabs.remove(tabIds, () => {
              resolve(closedTabs);
            });
          } else {
            LoggerService.info("No tabs to close.");
            resolve(closedTabs);
          }
        });
      } catch (err) {
        LoggerService.error("Error closing tabs:" + err);
        reject(err);
      }
    });
  }

  public async openTabs(Pages: Page[]): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        const urls = Pages.map((page) => page.url);
        chrome.tabs.create({ url: urls.join(",") }, () => {
          resolve();
        });
      } catch (err) {
        LoggerService.error("Error opening tabs:" + err);
        reject(err);
      }
    });
  }

  public async changeContext(): Promise<void> {}
}
