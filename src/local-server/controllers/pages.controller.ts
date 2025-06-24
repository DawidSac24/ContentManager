import { PagesService } from "../services/pages.service";
import { LoggerService } from "../services/logger.service";
import { isIdentifier } from "../utils/guards";
import { Page } from "../models/page.model";

/**
 * Controller for managing pages.
 * This singeleton class provides methods to interact with the ContextService and PagesService.
 * Manage contexts and its pages.
 */
export class PageController {
  private static instance: PageController;
  private pagesService: PagesService;

  private constructor() {
    this.pagesService = PagesService.getInstance();
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
      const page = await this.pagesService.getById(id);
      return page;
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
  public async saveOpenPages(id: number): Promise<Page[]> {
    try {
      if (!isIdentifier(id)) {
        LoggerService.error("Invalid context ID");
        throw new Error("Invalid context ID");
      }

      const pages = await this.pagesService.getById(id);

      const openedPages = await this.pagesService.getAllOpenPages();

      LoggerService.info("Pages stored successfully");
      return openedPages;
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

    const context = await this.getById(contextId);

    if (context.pages.length <= 0) {
      alert("No pages saved on this context !");
      return;
    }

    try {
      this.pagesService.loadPages(context.pages);
    } catch (error) {
      LoggerService.error(error);
      throw error;
    }
  }
}
