import { ContextController } from "../../local-server/controllers/context.controller";
import { PagesService } from "../../local-server/services/pages.service";
import { ContextDTO } from "../../local-server/models/context.model";
import { LoggerService } from "../../local-server/services/logger.service";

const contextController = ContextController.getInstance();
const pagesService = PagesService.getInstance();

// export function loadContexts(): ContextDTO[] {
//   let loadedContexts: ContextDTO[] = [];
//   try {
//     loadedContexts = contextController.getAll();
//   } catch (error) {
//     LoggerService.error(error);
//   }

//   return loadedContexts;
// }

export function closeAllTabs(): void {
  try {
    pagesService
      .closeAllTabs()
      .catch((error) => {
        console.error("Error closing tabs:", error);
      })
      .then((value) => {
        console.log("All tabs closed successfully.");
      });
  } catch (error) {}
}

export function testDatabase(): void {
  const context1: ContextDTO = {
    id: 1,
    name: "Context 1",
    pages: [],
    isDeleted: false,
  };
  contextController.addContext(context1);
}
