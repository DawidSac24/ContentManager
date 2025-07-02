import { ContextController } from "../controllers/contexts.controller";

let controller: ContextController;

beforeEach(() => {
  jest.resetModules(); // or use a resetInstance method
  controller = ContextController.getInstance();
});

describe("Context Controller", () => {
  describe("adding tests", () => {
    it("should add a context", async () => {
      const context = await controller.addContext({ name: "Test Context" });
      expect(context.name).toBe("Test Context");
      expect(context.id).toBeDefined();
    });
  });

  describe("getting data tests", () => {
    it("should get all contexts", async () => {
      const contexts = await controller.getAll();
      expect(Array.isArray(contexts)).toBe(true);
    });

    it("should get a context by id", async () => {
      const context = await controller.addContext({ name: "Test Context" });
      const fetchedContext = await controller.getById(context.id);
      expect(fetchedContext.id).toBe(context.id);
      expect(fetchedContext.name).toBe("Test Context");
    });
  });

  describe("modifying data tests", () => {
    it("should update a context", async () => {
      const addedContext = await controller.addContext({
        name: "Test Context",
      });
      const context = await controller.updateContext({
        id: addedContext.id,
        name: "Updated Context",
      });
      const updatedContext = await controller.updateContext(context);
      expect(updatedContext.name).toBe("Updated Context");
    });
  });

  describe("deleting data tests", () => {
    it("should delete a context", async () => {
      const context = await controller.addContext({ name: "Test Context" });
      await controller.deleteContext(context.id);

      const result = await controller.getById(context.id);
      expect(result).toBeUndefined();
    });
  });
});
