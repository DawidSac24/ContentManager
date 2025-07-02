import { PageController } from "../controllers/pages.controller";
import { ContextController } from "../controllers/contexts.controller";

let controller: PageController;
let contextController: ContextController;

beforeEach(() => {
  jest.resetModules(); // or use a resetInstance method
  controller = PageController.getInstance();
  contextController = ContextController.getInstance();
});

describe("Page Controller", () => {
  describe("adding tests", () => {
    it("should add a page", async () => {
      const mockPages = await controller.add(
        [{ title: "Test Page", url: "Test url" }],
        1
      );

      expect(mockPages[0].title).toBe("Test Page");
      expect(mockPages[0].id).toBeDefined();

      console.log("All contexts: \n", await contextController.getAll());
    });
  });
});
