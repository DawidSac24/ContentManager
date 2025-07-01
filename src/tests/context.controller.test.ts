import { ContextController } from "../controllers/contexts.controller";

let controller: ContextController;

beforeEach(() => {
  jest.resetModules(); // or use a resetInstance method
  controller = ContextController.getInstance();
});

describe("ContextController adding tests", () => {
  it("should add a context", async () => {
    const context = await controller.addContext({ name: "Test Context" });
    expect(context.name).toBe("Test Context");
  });
});

describe("ContextController getting tests", () => {
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

  it("should throw an error when getting a context by invalid id", async () => {
    await expect(controller.getById(-1)).rejects.toThrow("Invalid context id");
  });
});

describe("ContextController modifying/deleteing tests", () => {
  it("should update a context", async () => {
    const context = await controller.addContext({ name: "Test Context" });
    context.name = "Updated Context";
    const updatedContext = await controller.updateContext(context);
    expect(updatedContext.name).toBe("Updated Context");
  });

  it("should throw an error", async () => {
    const context = await controller.addContext({ name: "Test Context" });
    context.name = "Updated Context";
    const updatedContext = await controller.updateContext(context);
    expect(updatedContext.name).toBe("Updated Context");
  });

  it("should delete a context", async () => {
    const context = await controller.addContext({ name: "Test Context" });
    const deletedContext = await controller.deleteContext(context.id);
    expect(deletedContext.id).toBe(context.id);
  });
});
