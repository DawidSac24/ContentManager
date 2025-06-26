import { PagesService } from "../services/pages.service";
import { ContextPageLinkService } from "../services/context-page.link.service";
import { LoggerService } from "../services/logger.service";
import { isIdentifier, isPagesArray } from "../utils/guards";
import { NewPage, Page } from "../models/page.model";
import { ContextPageLinks } from "../models/context-page.links.model";

/**
 * Controller for managing pages.
 * This singeleton class provides methods to interact with the ContextService and PagesService.
 * Manage contexts and its pages.
 */
export class PageController {
  private static instance: PageController;
  private pagesService: PagesService;
  private contextPageLinkService: ContextPageLinkService;

  private constructor() {
    this.pagesService = PagesService.getInstance();
    this.contextPageLinkService = ContextPageLinkService.getInstance();
  }

  public static getInstance(): PageController {
    if (!PageController.instance) {
      PageController.instance = new PageController();
    }
    return PageController.instance;
  }

  public async getById(id: number): Promise<Page> {
    if (!isIdentifier(id)) {
      LoggerService.error("Invalid page ID");
      throw new Error("Invalid page ID");
    }

    try {
      const page: Page = await this.pagesService.getById(id);
      return page;
    } catch (error) {
      LoggerService.error(error);
      throw error;
    }
  }

  /**
   * Retrieves all pages associated with a specific context ID.
   * This method fetches the context-page links for the given context ID,
   * then retrieves the corresponding Page objects for each link.
   * @param contextId The ID of the context to retrieve pages for.
   * @returns A promise that resolves to an array of Page objects.
   */
  public async getByContextId(contextId: number): Promise<Page[]> {
    if (!isIdentifier(contextId)) {
      LoggerService.error("Invalid context ID");
      throw new Error("Invalid context ID");
    }
    try {
      const links: ContextPageLinks[] =
        await this.contextPageLinkService.getByContextId(contextId);

      const pages: Page[] = [];

      for (const link of links) {
        if (!isIdentifier(link.pageId)) {
          LoggerService.error("Invalid page ID in context-page link");
          throw new Error("Invalid page ID in context-page link");
        }
        const page: Page = await this.pagesService.getById(link.pageId);
        pages.push(page);
      }

      return pages;
    } catch (error) {
      LoggerService.error(error);
      throw error;
    }
  }

  /**
   * Adds new pages to the database and links them to a specific context
   * by adding the context-page-links.
   * @param pages An array of NewPage objects to be added.
   * @param contextId The ID of the context to link the pages to.
   * @returns A promise that resolves to an array of added Page objects.
   */
  public async add(pages: NewPage[], contextId: number): Promise<Page[]> {
    if (!isIdentifier(contextId)) {
      LoggerService.error("Invalid context ID");
      throw new Error("Invalid context ID");
    }

    if (!isPagesArray(pages)) {
      LoggerService.error("Invalid pages array");
      throw new Error("Invalid pages array");
    }

    try {
      console.log("Adding pages:", pages, "to context ID:", contextId);
      const addedPages: Page[] = await this.pagesService.add(pages);
      console.log("Added pages:", addedPages);
      await this.contextPageLinkService.add(addedPages, contextId);
      LoggerService.info("Pages added successfully");
      return addedPages;
    } catch (error) {
      LoggerService.error(error);
      throw error;
    }
  }

  /**
   * Saves all the opened pages
   * @param contextId The context where the pages will be stored
   * @returns the edited Context
   */
  public async saveOpenPages(contextId: number): Promise<Page[]> {
    try {
      if (!isIdentifier(contextId)) {
        LoggerService.error("Invalid context ID ( pages.controller.ts )");
        throw new Error("Invalid context ID");
      }

      console.log("Saving open pages...");

      await this.pagesService.deleteByContextId(contextId);

      console.log("cleared pages by context ID");

      const openedPages: NewPage[] = await this.pagesService.getOpenPages();

      console.log("retrieved open pages", openedPages);

      const result: Page[] = await this.add(openedPages, contextId);

      LoggerService.info("Pages stored successfully");
      return result;
    } catch (error) {
      LoggerService.error(error);
      throw error;
    }
  }

  /**
   * Closes open pages and loads the pages from the context
   * @param contextId with the pages we want to load
   */
  public async loadPages(contextId: number): Promise<void> {
    if (!isIdentifier(contextId)) {
      LoggerService.error("Invalid context ID");
      throw new Error("Invalid context ID");
    }

    try {
      const pages: Page[] = await this.getByContextId(contextId);

      this.pagesService.load(pages);
    } catch (error) {
      LoggerService.error(error);
      throw error;
    }
  }
}
