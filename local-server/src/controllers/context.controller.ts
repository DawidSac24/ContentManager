import { ContextService } from "../services/context.service";
import { LoggerService } from "../services/logger.service";
import { ContextDTO, NewContextDTO } from "../models/context.model";
import { isContext, isIdentifier, isNewContext } from "../utils/guards";

export class ContextController {
  private static instance: ContextController;
  private contextService: ContextService;
  private exampleContexts: ContextDTO[] = [
    {
      id: 1,
      name: "Work",
      pages: [],
      isDeleted: false,
    },
    {
      id: 2,
      name: "Development",
      pages: [],
      isDeleted: false,
    },
    {
      id: 3,
      name: "Learning",
      pages: [],
      isDeleted: false,
    },
  ];

  private constructor() {
    this.contextService = ContextService.getInstance();
  }

  public static getInstance(): ContextController {
    if (!ContextController.instance) {
      ContextController.instance = new ContextController();
    }
    return ContextController.instance;
  }

  async add(newContext: NewContextDTO): Promise<ContextDTO> {
    LoggerService.info(`Adding context: ${newContext.name}`);

    if (!isNewContext(newContext)) {
      LoggerService.error("Invalid new context model");
      throw new Error("Invalid new context model");
    }

    const context = await this.contextService.add(newContext);

    if (!context) {
      LoggerService.error("Failed to create context");
      throw new Error("Failed to create context");
    }

    LoggerService.alert(`Context ${context.name} created successfully`);
    return context as ContextDTO;
  }

  async getAll(): Promise<ContextDTO[]> {
    LoggerService.info("Getting all contexts");
    // For testing purposes, return example contexts
    return this.exampleContexts;

    // Original implementation:
    // const contexts = await this.contextService.getAll();
    // LoggerService.info(`Found ${contexts.length} contexts`);
    // return contexts as ContextDTO[];
  }

  async getById(id: number): Promise<ContextDTO> {
    LoggerService.info(`Getting context with id: ${id}`);

    if (!isIdentifier(id)) {
      LoggerService.error("Invalid context id");
      throw new Error("Invalid context id");
    }

    const context = await this.contextService.getById(id);

    if (!context) {
      LoggerService.error("Context not found");
      throw new Error("Context not found");
    }

    LoggerService.info(`Context ${context.name} found successfully`);
    return context as ContextDTO;
  }

  async update(updatedContext: ContextDTO): Promise<void> {
    LoggerService.info(`Updating context: ${updatedContext.name}`);

    if (!isContext(updatedContext)) {
      LoggerService.error("Invalid context model");
      throw new Error("Invalid context model");
    }

    await this.contextService.update(updatedContext);
  }

  async softDelete(id: number): Promise<void> {
    LoggerService.info(`Soft deleting context with id: ${id}`);

    if (!isIdentifier(id)) {
      LoggerService.error("Invalid context id");
      throw new Error("Invalid context id");
    }

    await this.contextService.softDelete(id);
  }

  async delete(id: number): Promise<void> {
    LoggerService.info(`Deleting context with id: ${id}`);

    if (!isIdentifier(id)) {
      LoggerService.error("Invalid context id");
      throw new Error("Invalid context id");
    }

    await this.contextService.delete(id);
  }
}
