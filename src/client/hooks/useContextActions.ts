import { ContextController } from "../../local-server/controllers/context.controller";
import { ContextDTO } from "../../local-server/models/context.model";

const contextController = ContextController.getInstance();

export function useContextActions() {
  const editContext = async (context: ContextDTO, newContextName: string) => {
    try {
      context.name = newContextName;
      await contextController.updateContext(context);
    } catch (error) {
      throw error;
    }
  };

  const deleteContext = async (contextId: number) => {
    try {
      await contextController.deleteContext(contextId);
    } catch (error) {
      throw error;
    }
  };

  return { editContext, deleteContext };
}
