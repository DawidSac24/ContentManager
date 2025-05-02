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

  public createPagesWithTabs(tabs: chrome.tabs.Tab[]): Page[] {
    const pages: Page[] = tabs.map((tab) => ({
      id: tab.id,
      title: tab.title || "No Title",
      url: tab.url || "No URL",
    }));

    return pages;
  }

  public async closeAllTabs(): Promise<Page[]> {
    LoggerService.info("Closing all tabs...");

    // 1. Create a new blank Google tab
    const newTab = await chrome.tabs.create({ url: "https://www.google.com" });

    // 2. Get all the open tabs
    const allTabs = await chrome.tabs.query({});

    // 3. Filter out the newly created tab
    const tabsToClose = allTabs.filter(
      (tab) => tab.id !== newTab.id && tab.id !== undefined
    );

    const closedPages = this.createPagesWithTabs(tabsToClose);

    // 4. Close the other tabs
    const tabIdsToClose = tabsToClose.map((tab) => tab.id as number);
    if (tabIdsToClose.length > 0) {
      await chrome.tabs.remove(tabIdsToClose);
    }

    return closedPages;
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

  public async changeContext(newTabs: Page[]): Promise<Page[]> {
    return new Promise(async (resolve, reject) => {
      try {
        // Close all tabs
        const closedTabs = await this.closeAllTabs();

        // Open new tabs
        await this.openTabs(newTabs);

        resolve(closedTabs);
      } catch (err) {
        LoggerService.error("Error changing context:" + err);
        reject(err);
      }
    });
  }
}
