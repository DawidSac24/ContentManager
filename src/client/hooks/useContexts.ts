// hooks/useContexts.ts

import { useState, useEffect } from "react";
import {
  ContextDTO,
  NewContextDTO,
} from "../../local-server/models/context.model";
import { ContextController } from "../../local-server/controllers/context.controller";
import { LoggerService } from "../../local-server/services/logger.service";

const contextController = ContextController.getInstance();

export function useContexts() {
  const [contexts, setContexts] = useState<ContextDTO[]>([]);
  const [openedContext, setOpenedContext] = useState<ContextDTO | null>(null);
  const [selectedContext, setSelectedContext] = useState<ContextDTO | null>(
    null
  );
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedName, setEditedName] = useState<string>("");

  useEffect(() => {
    const loadContexts = async () => {
      const result = await contextController.getAll();
      setContexts(result);
    };
    loadContexts();
  }, []);

  const selectContext = (context: ContextDTO) => {
    setSelectedContext(context);
    setEditedName(context.name); // Set the name for editing
  };

  const openContext = async () => {
    if (!selectedContext) {
      LoggerService.alert("No Context Selected !");
      return;
    }

    LoggerService.info(`opening the context: ${selectedContext.name}`);

    try {
      if (openedContext) {
        contextController.storeOpenPages(openedContext);
        LoggerService.info(`Saved pages in Context: ${selectedContext.name}`);
      } else {
        const result = confirm(
          "No opened Context, do you wont to save the current pages in a new TEMP CONTEXT ?"
        );
        if (result) {
          LoggerService.info("User clicked OK");

          // Saving the opened pages in a new Context
          const tempContext = await contextController.addContext({
            name: "TEMP CONTEXT",
          });

          await contextController.storeOpenPages(tempContext);
        } else {
          LoggerService.info("User clicked Cancel");
        }

        // contextController.loadPages(selectedContext);
      }

      const result = await contextController.getAll();
      setContexts(result);
      setOpenedContext(selectedContext);
    } catch (error) {
      LoggerService.error(error);
      throw error;
    }
  };

  const addContext = async (newContext: NewContextDTO) => {
    const addedContext = await contextController.addContext(newContext);
    const result = await contextController.getAll();
    setContexts(result);
    setSelectedContext(addedContext);
    setIsEditing(true);
  };

  const updateContext = async (name: string) => {
    if (!selectedContext) {
      LoggerService.alert("No Context Selected !");
      return;
    }
    const updatedContext: ContextDTO = { ...selectedContext, name };
    await contextController.updateContext(updatedContext);
    const result = await contextController.getAll();
    setContexts(result);
    setSelectedContext(updatedContext);
    setIsEditing(false);
  };

  const deleteContext = async () => {
    if (!selectedContext) {
      LoggerService.alert("No Context Selected !");
      return;
    }
    await contextController.deleteContext(selectedContext);
    const result = await contextController.getAll();
    setContexts(result);
    setSelectedContext(null); // Reset selected context
  };

  const savePages = async (context: ContextDTO) => {
    if (!selectedContext) {
      LoggerService.alert("No Context Selected !");
      return;
    }
  };

  return {
    contexts,
    openedContext,
    selectedContext,
    isEditing,
    editedName,
    openContext,
    selectContext,
    addContext,
    updateContext,
    deleteContext,
    savePages,
    setEditedName,
    setIsEditing,
  };
}
