import { ContextDTO, NewContext } from "../models/context.model";
import { ContextService } from "../services/context.service";
import { LoggerService } from "../services/logger.service";
import { isIdentifier } from "../utils/guards";

/**
 * Controller for managing contexts.
 * This singeleton class provides methods to interact with the ContextService and PagesService.
 * Manage contexts and its pages.
 */
export class ContextController {
  private static instance: ContextController;
  private contextService: ContextService;

  private constructor() {
    this.contextService = ContextService.getInstance();
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
    const newContext: NewContext = {
      name: "New Context",
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
}
