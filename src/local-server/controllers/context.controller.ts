import { ContextDTO, NewContextDTO } from "../models/context.model";
import { ContextService } from "../services/context.service";
import { LoggerService } from "../services/logger.service";

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

  public async getAll(): Promise<ContextDTO[]> {
    LoggerService.info("Get all contexts");

    try {
      const contexts = await this.contextService.getContexts();
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
    context: NewContextDTO
  ): Promise<ContextDTO | undefined> {
    LoggerService.info(`Add context: ${context.name}`);
    const newContext: ContextDTO = {
      name: context.name,
      pages: [],
      isDeleted: false,
    };

    try {
      const added = await this.contextService.addContext(newContext);
      LoggerService.info(`Context: ${context.name} added successfully`);
      return added;
    } catch (error) {
      LoggerService.error(error);
      return undefined;
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
}
