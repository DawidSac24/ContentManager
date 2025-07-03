import {
  NewContextPageLinks,
  ContextPageLinks,
} from "../models/context-page.links.model";
import { Page } from "../models/page.model";
import { openDatabase } from "./db.service";

export class ContextPageLinkService {
  private static instance: ContextPageLinkService;

  private constructor() {}

  public static getInstance(): ContextPageLinkService {
    if (!ContextPageLinkService.instance) {
      ContextPageLinkService.instance = new ContextPageLinkService();
    }
    return ContextPageLinkService.instance;
  }

  public async getByContextId(contextId: number): Promise<ContextPageLinks[]> {
    const db = await openDatabase();

    return new Promise((resolve, reject) => {
      const transaction = db.transaction("contextPageLinks", "readonly");
      const objectStore = transaction.objectStore("contextPageLinks");
      const index = objectStore.index("contextId");
      const getRequest = index.getAll(contextId);

      getRequest.onsuccess = () => {
        resolve(getRequest.result as ContextPageLinks[]);
      };

      getRequest.onerror = function () {
        reject(
          new Error(`Error getting context page links: ${getRequest.error}`)
        );
      };
    });
  }

  public async add(
    pages: Page[],
    contextId: number
  ): Promise<ContextPageLinks[]> {
    const db = await openDatabase();

    return new Promise((resolve, reject) => {
      const transaction = db.transaction("contextPageLinks", "readwrite");
      const objectStore = transaction.objectStore("contextPageLinks");
      const uniqueIndex = objectStore.index("context_page_unique");

      const result: ContextPageLinks[] = [];
      pages.forEach((page) => {
        const key = [contextId, page.id];
        const getRequest = uniqueIndex.getKey(key);

        getRequest.onsuccess = () => {
          if (getRequest.result === undefined) {
            // Link doesn't exist, so add it
            const newLink: NewContextPageLinks = {
              contextId,
              pageId: page.id,
            };

            const addRequest = objectStore.add(newLink);

            addRequest.onsuccess = () => {
              result.push({
                ...newLink,
                id: addRequest.result as number,
              });
            };

            addRequest.onerror = () => {
              reject(
                new Error(`Error adding context page link: ${addRequest.error}`)
              );
            };
          }
        };
        getRequest.onerror = () => {
          reject(
            new Error(`Error checking existing link: ${getRequest.error}`)
          );
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

  public async deleteByContextId(contextId: number): Promise<number[]> {
    const db = await openDatabase();

    return new Promise((resolve, reject) => {
      const transaction = db.transaction("contextPageLinks", "readwrite");
      const objectStore = transaction.objectStore("contextPageLinks");
      const index = objectStore.index("contextId");
      const getRequest = index.getAll(contextId);
      const deletedPagesIds: number[] = [];

      getRequest.onsuccess = () => {
        const linksToDelete = getRequest.result as ContextPageLinks[];
        if (linksToDelete.length === 0) {
          resolve(deletedPagesIds);
          return;
        }

        for (const link of linksToDelete) {
          deletedPagesIds.push(link.pageId);

          const deleteRequest = objectStore.delete(link.id);
          deleteRequest.onerror = function () {
            reject(
              new Error(
                `Error deleting context page link: ${deleteRequest.error}`
              )
            );
          };
        }
      };

      getRequest.onerror = function () {
        reject(
          new Error(`Error getting context page links: ${getRequest.error}`)
        );
      };

      transaction.oncomplete = () => {
        resolve(deletedPagesIds);
      };
    });
  }
}
