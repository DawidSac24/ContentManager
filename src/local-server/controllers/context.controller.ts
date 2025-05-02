import { ContextDTO, NewContextDTO } from "../models/context.model";
import { PageDTO } from "../models/page.model";
import { ContextService } from "../services/context.service";
import { PagesService } from "../services/pages.service";
import { LoggerService } from "../services/logger.service";
import { isContext, isIdentifier, isNewContext } from "../utils/guards";
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

  public async getAll(): Promise<ContextDTO[]> {
    LoggerService.info("Get all contexts");

    try {
      const contexts = await this.contextService.getAllContexts();
      const result: ContextDTO[] = contexts.map((context) => ({
        id: context.id,
        name: context.name,
        pages: context.pages,
        isDeleted: context.isDeleted,
      }));
      return result;
    } catch (error) {
      LoggerService.error(error);
      return [];
    }
  }

  public async addContext(
    context: NewContextDTO | ContextDTO
  ): Promise<ContextDTO> {
    LoggerService.info(`Add context: ${context.name}`);

    let newContext: ContextDTO;
    LoggerService.info(`Add context: ${context.name}`);
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
      return Promise.reject("Invalid context type");
    }

    try {
      const added = await this.contextService.addContext(newContext);
      LoggerService.info(`Context: ${context.name} added successfully`);
      return added;
    } catch (error) {
      LoggerService.error(error);
      return Promise.reject(error);
    }
  }

  public async putContext(
    context: ContextDTO
  ): Promise<ContextDTO | undefined> {
    LoggerService.info(`Update context: ${context.name}`);

    try {
      const updated = await this.contextService.putContext(context);
      LoggerService.info(`Context: ${context.name} updated successfully`);
      return updated;
    } catch (error) {
      LoggerService.error(error);
      return undefined;
    }
  }

  public async deleteContext(id: number): Promise<void> {
    LoggerService.info(`Delete context with id: ${id}`);

    try {
      await this.contextService.deleteContext(id);
      LoggerService.info(`Context with id: ${id} deleted successfully`);
    } catch (error) {
      LoggerService.error(error);
    }
  }

  public async assignPagesToContext(
    contextId: number,
    pages: PageDTO[]
  ): Promise<ContextDTO | undefined> {
    LoggerService.info(`Assign pages to context with id: ${contextId}`);

    try {
      const context = await this.contextService.assignPagesToContext(
        contextId,
        pages
      );
      LoggerService.info(
        `Pages assigned to context with id: ${contextId} successfully`
      );
      return context;
    } catch (error) {
      LoggerService.error(error);
      return undefined;
    }
  }

  public async assignOpenPagesToContext(
    contextId: number | undefined
  ): Promise<ContextDTO> {
    LoggerService.info(`Assign pages to context with id: ${contextId}`);

    if (contextId === undefined) {
      LoggerService.error("Context ID is undefined");
      return Promise.reject("Context ID is undefined");
    }

    return new Promise(async (resolve, reject) => {
      const pages = await this.pagesService.getAllOpenTabs();

      try {
        const context = await this.contextService.assignPagesToContext(
          contextId,
          pages
        );
        LoggerService.info(
          `Pages assigned to context with id: ${contextId} successfully`
        );
        resolve(context);
      } catch (error) {
        LoggerService.error(error);
        reject(error);
      }
    });
  }

  public async changeContext(contextId: number): Promise<ContextDTO> {
    LoggerService.info(`Open context with id: ${contextId}`);

    if (!isIdentifier(contextId)) {
      console.error("Invalid ID type:", contextId);
      return Promise.reject("Invalid ID type");
    }

    try {
      const context = await this.contextService.getContextById(contextId);

      if (!isContext(context)) {
        LoggerService.error(`Context with id: ${contextId} not found`);
        return Promise.reject(`Context with id: ${contextId} not found`);
      }

      const tempPages = await this.pagesService.changeContext(context.pages);

      LoggerService.info(`old pages: ${tempPages}`);

      const tempContext = await this.addContext({
        name: `Temp Context ${contextId}`,
        pages: tempPages,
        isDeleted: false,
      });

      LoggerService.info(`Temp context: ${tempContext}`);

      this.pagesService.openTabs(context.pages);
      LoggerService.info(`Context with id: ${contextId} opened successfully`);

      return tempContext;
    } catch (error) {
      LoggerService.error(error);
    }
  }
}
