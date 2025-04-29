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

  public getAll(): ContextDTO[] {
    LoggerService.info("Get all contexts");

    let result: ContextDTO[] = [];

    try {
      this.contextService.getContexts().then((contexts) => {
        if (contexts) {
          for (const context of contexts) {
            const contextDTO = {
              id: context.id,
              name: context.name,
              pages: context.pages,
              isDeleted: context.isDeleted,
            };
            result.push(contextDTO);
          }
        }
      });
    } catch (error) {
      LoggerService.error(error);
      return [];
    }

    return result;
  }

  public addContext(context: ContextDTO): ContextDTO | undefined {
    LoggerService.info("Add context: ${context.name}");

    let result: ContextDTO | undefined = undefined;

    try {
      this.contextService.addContext(context).then(() => {
        LoggerService.info(`Context: ${context} added successfully`);
        result = context;
      });
    } catch (error) {
      LoggerService.error(error);
    }

    return result;
  }
}
