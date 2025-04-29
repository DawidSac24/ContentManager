import { ContextDTO } from "../models/context.model";
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
    context: ContextDTO
  ): Promise<ContextDTO | undefined> {
    LoggerService.info(`Add context: ${context.name}`);

    try {
      const added = await this.contextService.addContext(context);
      LoggerService.info(`Context: ${context.name} added successfully`);
      return added;
    } catch (error) {
      LoggerService.error(error);
      return undefined;
    }
  }
}
