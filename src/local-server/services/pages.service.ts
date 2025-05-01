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
}
