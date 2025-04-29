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

  public getContexts(): ContextDTO[] {
    let result: ContextDTO[] = [];
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
    return result;
  }
}
