import { useState, useEffect } from "react";

import { Context } from "../../models/context.model";
import { ContextController } from "../../controllers/contexts.controller";

const contextController = ContextController.getInstance();

export function useContextlist() {
  const [contexts, setContexts] = useState<Context[]>([]);
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

  const editContext = async (contextToUpdate: Context) => {
    try {
      await contextController.updateContext(contextToUpdate);
      loadContexts();
    } catch (error) {
      console.error(error);
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
