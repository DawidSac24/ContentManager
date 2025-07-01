import { ContextController } from "../../controllers/contexts.controller";
import { PageController } from "../../controllers/pages.controller";
import { Context } from "../../models/context.model";

const contextController = ContextController.getInstance();
const pageController = PageController.getInstance();

export function useContextActions() {
  const editContext = async (context: Context, newContextName: string) => {
    context.name = newContextName;
    await contextController.updateContext(context);
  };

  const loadContext = async (contextId: number) => {
    await pageController.loadPages(contextId);
  };

  const saveContext = async (contextId: number) => {
    await pageController.saveOpenPages(contextId);
  };

  const deleteContext = async (contextId: number) => {
    await contextController.deleteContext(contextId);
  };

  return { editContext, loadContext, saveContext, deleteContext };
}
