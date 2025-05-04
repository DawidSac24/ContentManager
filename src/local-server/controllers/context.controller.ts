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
  public selectedContext: ContextDTO | undefined;
  public openedContext: ContextDTO | undefined;

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

  public selectContext(context: ContextDTO) {
    this.selectedContext = context;
  }

  public isSelected(context: ContextDTO): boolean {
    return this.selectedContext?.id === context.id;
  }

  public openContext(context: ContextDTO) {
    this.openedContext = context;
  }

  public isOpen(context: ContextDTO): boolean {
    return this.openedContext?.id === context.id;
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
   *  - NewContextDTO: A new context object with a name and an empty pages array.
   *  - ContextDTO: An existing context object to be added.
   * @returns A promise that resolves to the updated ContextDTO object.
   * @throws Error if the context cannot be added.
   * @throws Error if the context is invalid.
   */
  public async addContext(
    context: ContextDTO | NewContextDTO
  ): Promise<ContextDTO> {
    LoggerService.info(`Add context: ${context.name}`);

    let newContext: ContextDTO;

    if (isNewContext(context)) {
      newContext = {
        name: context.name,
        pages: [],
        isDeleted: false,
      };
    } else if (isContext(context)) {
      newContext = context;
    } else {
      LoggerService.error("Invalid context type");
      throw new Error("Invalid context type");
    }

    try {
      const added = await this.contextService.addContext(newContext);
      LoggerService.info(`Context: ${context.name} added successfully`);
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
   * @returns void
   * @throws Error if no context is selected or if the ID type is invalid.
   * @throws Error if the context cannot be deleted.
   */
  public async deleteContext(): Promise<void> {
    return new Promise(async (resolve, reject) => {
      if (!this.selectedContext) {
        LoggerService.error("No context selected for deletion");
        return reject("No context selected for deletion");
      }

      if (!isIdentifier(this.selectedContext.id)) {
        LoggerService.error("Invalid ID type");
        return reject("Invalid ID type");
      }
      LoggerService.info(`Delete context: ${this.selectedContext.name}`);

      try {
        await this.contextService.deleteContext(this.selectedContext.id);
        LoggerService.info(
          `Context ${this.selectedContext.name} deleted successfully`
        );

        this.selectedContext = undefined;
        return resolve();
      } catch (error) {
        LoggerService.error(error);
        return reject(error);
      }
    });
  }

  /**
   * Assign pages to the selected context.
   * @param pages The pages to assign to the context.
   * @returns A promise that resolves to the updated ContextDTO object.
   * @throws Error if no context is selected or if the ID type is invalid.
   * @throws Error if the pages cannot be assigned.
   */
  public async assignPagesToContext(pages: PageDTO[]): Promise<ContextDTO> {
    if (!this.selectedContext) {
      LoggerService.error("No context selected for assignment");
      throw new Error("No context selected for assignment");
    }

    if (!this.selectedContext.id) {
      LoggerService.error("Invalid ID type of selected context");
      throw new Error("Invalid ID type of selected context");
    }

    LoggerService.info(`Assign pages to context: ${this.selectedContext.name}`);

    try {
      const context = await this.contextService.assignPagesToContext(
        this.selectedContext.id,
        pages
      );
      LoggerService.info(
        `Pages assigned to context: ${this.selectedContext.name} successfully`
      );
      this.openContext(this.selectedContext);
      return context;
    } catch (error) {
      LoggerService.error(error);
      throw error;
    }
  }

  /**
   * Assign all open pages to the context with the given ID.
   * @param contextId The ID of the context to assign pages to.
   * @returns A promise that resolves to the updated ContextDTO object.
   * @throws Error if the context ID is undefined or if the assignment fails.
   */
  public async assignOpenPagesToContext(): Promise<ContextDTO> {
    if (!this.selectedContext) {
      LoggerService.error("No context selected for assignment");
      throw new Error("No context selected for assignment");
    }

    if (!this.selectedContext.id) {
      LoggerService.error("Invalid ID type of selected context");
      throw new Error("Invalid ID type of selected context");
    }

    LoggerService.info(`Assign pages to context: ${this.selectedContext.name}`);

    try {
      const pages = await this.pagesService.getAllOpenTabs();

      const context = await this.assignPagesToContext(pages);
      LoggerService.info(
        `Pages assigned to context: ${context.name} successfully`
      );
      this.openContext(context);
      return context;
    } catch (error) {
      LoggerService.error(error);
      throw error;
    }
  }

  /**
   * Change the context to the one with the given ID.
   * @param contextId The ID of the context to change to.
   * @returns A promise that resolves to the updated ContextDTO object.
   * @throws Error if the context ID is invalid or if the context cannot be changed.
   */
  public async changeContext(): Promise<ContextDTO> {
    if (!this.selectedContext) {
      throw new Error("No Selected Context !");
    }
    LoggerService.info(`Open context: ${this.selectedContext.name}`);

    try {
      const closedPages = await this.pagesService.changeContext(
        this.selectedContext.pages
      );
      this.assignPagesToContext(closedPages);
      this.openContext(this.selectedContext);
      return this.selectedContext;
    } catch (error) {
      LoggerService.error(error);
      throw error;
    }
  }
}
