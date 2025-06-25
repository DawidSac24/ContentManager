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

  public async getByContextId(contextId: number | undefined): Promise<Page[]> {
    if (!isIdentifier(contextId)) {
      LoggerService.error("Invalid context ID");
      throw new Error("Invalid context ID");
    }
    try {
      const pages = await this.pagesService.getAllByContextId(contextId);
      return pages;
    } catch (error) {
      LoggerService.error(error);
      throw error;
    }
  }

  public async addPages(pages: Page[]): Promise<void> {
    if (!Array.isArray(pages) || pages.length === 0) {
      LoggerService.error("Invalid pages array");
      throw new Error("Invalid pages array");
    }
    try {
      await this.pagesService.addPages(pages);
      LoggerService.info("Pages added successfully");
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

      const openedPages = await this.pagesService
        .saveOpenPages(contextId)
        .then((pages) => {
          this.addPages(pages);
          return pages;
        });

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

    try {
      const pages: Page[] = await this.pagesService.getAllByContextId(
        contextId
      );

      this.pagesService.load(pages);
    } catch (error) {
      LoggerService.error(error);
      throw error;
    }
  }
}
