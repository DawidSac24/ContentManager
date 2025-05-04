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
    contextController.selectContext(context);
    setSelectedContext(context);
    setEditedName(context.name); // Set the name for editing
  };

  const openContext = (context: ContextDTO) => {
    contextController.openContext(context);
    setOpenedContext(context);
  };

  const addContext = async (newContext: NewContextDTO) => {
    await contextController.addContext(newContext);
    const result = await contextController.getAll();
    setContexts(result);
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
    await contextController.deleteContext();
    const result = await contextController.getAll();
    setContexts(result);
    setSelectedContext(null); // Reset selected context
  };

  const loadPages = async () => {
    if (!selectedContext) {
      LoggerService.alert("No Context Selected !");
      return;
    }

    const openedContext = await contextController.changeContext();
    contextController.updateContext(openedContext);
  };

  const savePages = async () => {
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
    setEditedName,
    setIsEditing,
    loadPages,
    savePages,
  };
}
