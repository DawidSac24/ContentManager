import { ContextController } from "../../local-server/controllers/context.controller";
import { ContextDTO } from "../../local-server/models/context.model";

const contextController = ContextController.getInstance();

export function useContextActions() {
  const editContext = async (context: ContextDTO, newContextName: string) => {
    context.name = newContextName;
    await contextController.updateContext(context);
  };

  const loadContext = async (context: ContextDTO) => {
    await contextController.loadPages(context);
  };

  const saveContext = async (context: ContextDTO) => {
    await contextController.storeOpenPages(context);
  };

  const deleteContext = async (contextId: number) => {
    await contextController.deleteContext(contextId);
  };

  return { editContext, loadContext, saveContext, deleteContext };
}
