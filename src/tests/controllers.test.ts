import { ContextController } from "../controllers/contexts.controller";
import { PageController } from "../controllers/pages.controller";
import { NewPage } from "../models/page.model";
import { NewContext } from "../models/context.model";
import { PagesService } from "../services/pages.service";

// Mock Chrome APIs
export const chrome = {
  tabs: {
    query: jest.fn(),
    create: jest.fn(),
    remove: jest.fn(),
    sendMessage: jest.fn(),
  },
  runtime: {
    sendMessage: jest.fn(),
    lastError: undefined,
  },
};
(globalThis as unknown as { chrome: typeof chrome }).chrome = chrome;

describe("Controllers Integration", () => {
  let contextController: ContextController;
  let pageController: PageController;
  let contextId: number;

  beforeEach(async () => {
    jest.resetModules();
    contextController = ContextController.getInstance();
    pageController = PageController.getInstance();
    chrome.tabs.query.mockReset();
    chrome.tabs.create.mockReset();
    chrome.tabs.remove.mockReset();
    chrome.runtime.lastError = undefined;
  });

  it("should create, retrieve, update, and delete a context", async () => {
    // Create
    const newContext: NewContext = { name: "Integration Context" };
    const context = await contextController.addContext(newContext);
    expect(context).toHaveProperty("id");
    expect(context.name).toBe("Integration Context");
    contextId = context.id;

    // Retrieve
    const fetched = await contextController.getById(contextId);
    expect(fetched.id).toBe(contextId);
    expect(fetched.name).toBe("Integration Context");

    // Update
    const updated = await contextController.updateContext({
      ...fetched,
      name: "Updated Context",
    });
    expect(updated.name).toBe("Updated Context");

    // Delete
    await expect(
      contextController.deleteContext(contextId)
    ).resolves.toBeUndefined();
  });

  it("should add and retrieve pages for a context", async () => {
    // Create context
    const context = await contextController.addContext({
      name: "Pages Context",
    });
    contextId = context.id;
    // Add pages
    const mockPages: NewPage[] = [
      { title: "Page 1", url: "http://page1.com" },
      { title: "Page 2", url: "http://page2.com" },
    ];
    const addedPages = await pageController.add(mockPages, contextId);
    expect(addedPages.length).toBe(2);
    expect(addedPages[0]).toHaveProperty("id");
    // Retrieve by context
    const pages = await pageController.getByContextId(contextId);
    expect(pages.length).toBe(2);
    expect(pages[0].title).toBe("Page 1");
  });

  it("should get a page by id", async () => {
    const context = await contextController.addContext({
      name: "GetById Context",
    });
    contextId = context.id;
    const mockPages: NewPage[] = [
      { title: "Single Page", url: "http://single.com" },
    ];
    const [addedPage] = await pageController.add(mockPages, contextId);
    const page = await pageController.getById(addedPage.id);
    expect(page.title).toBe("Single Page");
    expect(page.url).toBe("http://single.com");
  });

  it("should save open pages in the db", async () => {
    const context = await contextController.addContext({
      name: "SaveOpen Context",
    });
    contextId = context.id;
    // Mock open tabs
    chrome.tabs.query.mockImplementation((queryInfo, callback) => {
      callback([
        { title: "Tab 1", url: "http://tab1.com" },
        { title: "Tab 2", url: "http://tab2.com" },
      ]);
    });
    const pagesService = PagesService.getInstance();
    const openPages = await pagesService.getOpenPages();
    expect(openPages.length).toBe(2);
    // Save open pages
    const savedPages = await pageController.saveOpenPages(contextId);
    expect(savedPages.length).toBe(2);
    expect(savedPages[0].title).toBe("Tab 1");
  });

  it("should load pages for a context (simulate tab closing/creation)", async () => {
    const context = await contextController.addContext({
      name: "Load Context",
    });
    contextId = context.id;
    const mockPages: NewPage[] = [
      { title: "Load Page 1", url: "http://load1.com" },
      { title: "Load Page 2", url: "http://load2.com" },
    ];
    await pageController.add(mockPages, contextId);
    // Mock tab closing and creation
    chrome.tabs.query.mockImplementation((queryInfo, callback) => {
      callback([
        { id: 1, title: "Old Tab", url: "http://old.com" },
        { id: 2, title: "Old Tab 2", url: "http://old2.com" },
      ]);
    });
    // Should not throw
    await expect(pageController.loadPages(contextId)).resolves.toBeUndefined();
  });
});
