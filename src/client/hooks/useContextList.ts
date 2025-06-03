import { useState, useEffect } from "react";

import { ContextDTO } from "../../local-server/models/context.model";
import { ContextController } from "../../local-server/controllers/context.controller";
import { LoggerService } from "../../local-server/services/logger.service";

const contextController = ContextController.getInstance();

export function useContextlist() {
  const [contexts, setContexts] = useState<ContextDTO[]>([]);
  const [selectedContextId, setSelectedContextId] = useState<
    number | undefined
  >();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedName, setEditedName] = useState<string>("");

  const loadContexts = async () => {
    try {
      const result = await contextController.getAll();
      setContexts(result);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  useEffect(() => {
    loadContexts();
  }, []);

  const addContext = async () => {
    try {
      await contextController.addContext();
      loadContexts();
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const unselectContext = async () => {
    setSelectedContextId(undefined);
    if (selectedContextId) {
      const contextToUpdate = await contextController.getById(
        selectedContextId
      );
      contextToUpdate.name = editedName;
      editContext(contextToUpdate);
    }

    setIsEditing(false);
    setEditedName("");
  };

  const editContext = async (contextToUpdate: ContextDTO) => {
    try {
      await contextController.updateContext(contextToUpdate);
      loadContexts();
    } catch (error) {
      LoggerService.error(error);
    }
  };

  return {
    contexts,
    selectedContextId,
    isEditing,
    loadContexts,
    addContext,
    setSelectedContextId,
    unselectContext,
    setIsEditing,
    editContext,
  };
}
