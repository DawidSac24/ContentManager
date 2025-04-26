import { Request, Response, Router } from "express";
import { LoggerService } from "../services/logger.service";
import { ContextDTO, NewContextDTO } from "../models/context.model";
import { isContext, isIdentifier, isNewContext } from "../utils/guards";
import { ContextService } from "../services/context.service";

export const ContextController = Router();

ContextController.post("/", async (req, res) => {
  LoggerService.info("[POST] /users/");
  const newContext: NewContextDTO = req.body;

  if (!isNewContext(newContext)) {
    LoggerService.error("Bad request: Invalid new context model");
    return res.status(400).json({ error: "Invalid new context model" });
  }

  try {
    const context = await ContextService.add(newContext);

    LoggerService.alert(`Context created successfully`);
    return res.status(200).json(context);
  } catch (error) {
    LoggerService.error("Internal server error");
    return res.status(500).json("Internal server error");
  }
});

ContextController.get("/", (req: Request, res: Response) => {
  LoggerService.info("[GET] /contexts/");

  LoggerService.info("Getting all contexts");
  const contexts = ContextService.getAll();
  return res.status(200).json(contexts);
});

// async getById(id: number): Promise<ContextDTO> {
//   LoggerService.info(`Getting context with id: ${id}`);

//   if (!isIdentifier(id)) {
//     LoggerService.error("Invalid context id");
//     throw new Error("Invalid context id");
//   }

//   const context = await ContextService.getById(id);

//   if (!context) {
//     LoggerService.error("Context not found");
//     throw new Error("Context not found");
//   }

//   LoggerService.info(`Context ${context.name} found successfully`);
//   return context as ContextDTO;
// }

ContextController.put("/", (req: Request, res: Response) => {
  LoggerService.info("[PUT] /contexts/");
  const updatedContext: ContextDTO = req.body;

  if (!isContext(updatedContext)) {
    LoggerService.error("Invalid context model");
    throw new Error("Invalid context model");
  }

  ContextService.update(updatedContext);

  return res.status(200).json(updatedContext);
});

ContextController.put("/soft-del/:id", (req: Request, res: Response) => {
  LoggerService.info("[PUT] /contexts/soft-del/:id");
  const id = parseInt(req.params.id);

  if (!isIdentifier(id)) {
    LoggerService.error("Invalid context id");
    throw new Error("Invalid context id");
  }

  ContextService.softDelete(id);

  return res.status(200).send("Context soft deleted successfully");
});

ContextController.delete("/:id", (req: Request, res: Response) => {
  LoggerService.info("[DELETE] /contexts/:id");
  const id = parseInt(req.params.id);

  if (!isIdentifier(id)) {
    LoggerService.error("Invalid context id");
    throw new Error("Invalid context id");
  }

  ContextService.delete(id);
  return res.status(200).send("Context deleted successfully");
});
