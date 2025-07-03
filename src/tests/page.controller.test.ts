import { ContextController } from "../controllers/contexts.controller";
import { PageController } from "../controllers/pages.controller";
import { NewPage } from "../models/page.model";

let controller: PageController;
let contextController: ContextController;

beforeEach(() => {
  jest.resetModules(); // or use a resetInstance method
  controller = PageController.getInstance();
  contextController = ContextController.getInstance();
});

const mockPages: NewPage[] = [{ title: "Test Page", url: "Test url" }];

describe("Page Controller", () => {
  describe("adding tests", () => {
    it("should throw if context not found", async () => {
      await expect(controller.add(mockPages, 1)).rejects.toThrow(
        "Context not found"
      );
    });

    it("should add a page", async () => {
      const context = await contextController.addContext({
        name: "Test Context",
      });
      const addedPages = await controller.add(mockPages, context.id);

      expect(addedPages.length).toBe(1);
      expect(addedPages[0].title).toBe("Test Page");
      expect(addedPages[0].id).toBeDefined();
    });
  });

  describe("getting tests", () => {
    it("should get a page by id", async () => {
      const context = await contextController.addContext({
        name: "Test Context",
      });
      const addedPages = await controller.add(mockPages, context.id);
      const page = await controller.getById(addedPages[0].id);
      expect(page.title).toBe("Test Page");
      expect(page.id).toBeDefined();
    });

    it("should get all pages by context id", async () => {
      const context = await contextController.addContext({
        name: "Test Context",
      });
      await controller.add(mockPages, context.id);
      const pages = await controller.getByContextId(context.id);

      expect(pages.length).toBe(1);
      expect(pages[0].title).toBe("Test Page");
      expect(pages[0].id).toBeDefined();
    });
  });
});
