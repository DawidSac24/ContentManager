import { Context, NewContext } from "../models/context.model";
import { ContextService } from "../services/context.service";
import { ContextPageLinkService } from "../services/context-page.link.service";
import { LoggerService } from "../services/logger.service";
import { isContext, isIdentifier } from "../utils/guards";

/**
 * Controller for managing contexts.
 * This singeleton class provides methods to interact with the ContextService and PagesService.
 * Manage contexts and its pages.
 */
export class ContextController {
  private static instance: ContextController;
  private contextService: ContextService;
  private contextPageLinkService: ContextPageLinkService;

  private constructor() {
    this.contextService = ContextService.getInstance();
    this.contextPageLinkService = ContextPageLinkService.getInstance();
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
  public async getAll(): Promise<Context[]> {
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

  public async getById(id: number): Promise<Context> {
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
   * @param newContext The NewContext to add.
   * @returns Context object representing the added context.
   * @throws Error if the context cannot be added.
   * @throws Error if the context is invalid.
   */
  public async addContext(newContext?: NewContext): Promise<Context> {
    if (!newContext) {
      newContext = {
        name: "New Context",
      };
    }

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
  public async updateContext(context: Context): Promise<Context> {
    LoggerService.info(`Update context: ${context.name}`);

    if (!isContext(context)) {
      LoggerService.error("Invalid context");
      throw new Error("Invalid context");
    }

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
   * Delete a context by its ID.
   * This method will also delete all associated page links.
   * @param contextId The ID of the context to delete.
   * @returns A promise that resolves when the context is deleted.
   * @throws Error if the context ID is invalid or if deletion fails.
   */
  public async deleteContext(contextId: number): Promise<void> {
    LoggerService.info(`delete context: ${contextId}`);

    if (!isIdentifier(contextId)) {
      LoggerService.error("Invalid ID type");
      throw new Error("Invalid ID type");
    }

    try {
      await this.contextService.deleteContext(contextId);
      this.contextPageLinkService.deleteByContextId(contextId);
      return;
    } catch (error) {
      LoggerService.error(error);
      throw error;
    }
  }
}
