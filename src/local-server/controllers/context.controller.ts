import { ContextDTO, NewContextDTO } from "../models/context.model";
import { PageDTO } from "../models/page.model";
import { ContextService } from "../services/context.service";
import { PagesService } from "../services/pages.service";
import { LoggerService } from "../services/logger.service";
import { isContext, isIdentifier, isNewContext } from "../utils/guards";

/**
 * Controller for managing contexts.
 * This singeleton class provides methods to interact with the ContextService and PagesService.
 * Manage contexts and its pages.
 */
export class ContextController {
  private static instance: ContextController;
  private contextService: ContextService;
  private pagesService: PagesService;

  private constructor() {
    this.contextService = ContextService.getInstance();
    this.pagesService = PagesService.getInstance();
  }

  public static getInstance(): ContextController {
    if (!ContextController.instance) {
      ContextController.instance = new ContextController();
    }
    return ContextController.instance;
  }

  /**
   * Get all contexts from the ContextService.
   * @returns A promise that resolves to an array of ContextDTO objects.
   */
  public async getAll(): Promise<ContextDTO[]> {
    LoggerService.info("Get all contexts");

    try {
      const contexts = await this.contextService.getAllContexts();
      LoggerService.info("Contexts loaded successfully");
      return contexts;
    } catch (error) {
      LoggerService.error(error);
      throw error;
    }
  }

  public async getById(id: number): Promise<ContextDTO> {
    LoggerService.info("Get context by id");

    if (!isIdentifier(id)) {
      LoggerService.error("Invalid context id");
      throw new Error("Invalid context id");
    }

    try {
      const context = await this.contextService.getById(id);
      return context;
    } catch (error) {
      LoggerService.error(error);
      throw error;
    }
  }

  /**
   * Add a new context.
   * @param context The context to add, either a NewContextDTO or ContextDTO object.
   * @returns A promise that resolves to the updated ContextDTO object.
   * @throws Error if the context cannot be added.
   * @throws Error if the context is invalid.
   */
  public async addContext(): Promise<ContextDTO> {
    const newContext: ContextDTO = {
      name: "New Context",
      pages: [],
    };

    LoggerService.info(`Add context: ${newContext.name}`);

    try {
      const added = await this.contextService.addContext(newContext);
      LoggerService.info(`Context: ${newContext.name} added successfully`);
      return added;
    } catch (error) {
      LoggerService.error(error);
      throw error;
    }
  }

  /**
   * Edit an existing context, creates one if it doesn't exist.
   * @param context The context to edit
   * @returns A promise that resolves to the updated ContextDTO object.
   * @throws Error if the context cannot be updated.
   * @throws Error if the context is invalid.
   */
  public async updateContext(context: ContextDTO): Promise<ContextDTO> {
    LoggerService.info(`Update context: ${context.name}`);

    try {
      const updated = await this.contextService.putContext(context);
      LoggerService.info(`Context: ${context.name} updated successfully`);
      return updated;
    } catch (error) {
      LoggerService.error(error);
      throw error;
    }
  }

  /**
   * Delete the selected context.
   * @param
   * @returns void
   * @throws Error if no context is selected or if the ID type is invalid.
   * @throws Error if the context cannot be deleted.
   */
  public async deleteContext(contextId: number): Promise<void> {
    if (!isIdentifier(contextId)) {
      LoggerService.error("Invalid ID type");
      throw new Error("Invalid ID type");
    }

    try {
      await this.contextService.deleteContext(contextId);
      return;
    } catch (error) {
      LoggerService.error(error);
      throw error;
    }
  }

  /**
   * Saves all the opened pages
   * @param context The context where the pages will be stored
   * @returns the edited Context
   */
  public async storeOpenPages(context: ContextDTO): Promise<ContextDTO> {
    LoggerService.info(`Storing all the pages on the context: ${context.name}`);

    try {
      const openedPages: PageDTO[] = await this.pagesService.closeAllPages();
      const contextToEdit: ContextDTO = {
        id: context.id,
        name: context.name,
        pages: openedPages,
      };
      const editedContext: ContextDTO = await this.updateContext(contextToEdit);

      LoggerService.info("Pages stored successfully");
      return editedContext;
    } catch (error) {
      LoggerService.error(error);
      throw error;
    }
  }

  /**
   * Closes open pages and loads the pages from the context
   * @param context with the pages we want to load
   */
  public async loadPages(context: ContextDTO): Promise<PageDTO[]> {
    LoggerService.info(
      `loading all the pages from the context: ${context.name}`
    );

    if (context.pages.length <= 0) {
      LoggerService.error("The context must have at least one saved page");
      throw new Error("The context must have at least one saved page");
    }

    try {
      const closedPages = this.pagesService.changeContext(context.pages);
      return closedPages;
    } catch (error) {
      LoggerService.error(error);
      throw error;
    }
  }
}
