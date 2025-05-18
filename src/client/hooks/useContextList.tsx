import { useState, useEffect, useContext } from "react";

import { ContextDTO } from "../../local-server/models/context.model";
import { ContextController } from "../../local-server/controllers/context.controller";

const contextController = ContextController.getInstance();

export function useContextlist() {
  const [contexts, setContexts] = useState<ContextDTO[]>([]);

  useEffect(() => {
    const loadContexts = async () => {
      const result = await contextController.getAll();
      setContexts(result);
    };
    loadContexts();
  }, []);

  const addContext = async () => {
    try {
      await contextController.addContext();
      const contexts = await contextController.getAll();
      setContexts(contexts);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  return {
    contexts,
    addContext,
  };
}
