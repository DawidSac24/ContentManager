import "../styles/Contexts.css";
import { useEffect, useState } from "react";
import { ContextController } from "../../local-server/controllers/context.controller";
import { ContextDTO } from "../../local-server/models/context.model";
import { PagesService } from "../../local-server/services/pages.service";

const contextController = ContextController.getInstance();
const pagesService = PagesService.getInstance();

function Contexts() {
  const [contexts, setContexts] = useState<ContextDTO[]>([]);

  useEffect(() => {
    const loadContexts = async () => {
      const testContexts: ContextDTO[] = [
        { id: 1, name: "Test Context 1", pages: [], isDeleted: false },
        { id: 2, name: "Test Context 2", pages: [], isDeleted: false },
        { id: 3, name: "Test Context 3", pages: [], isDeleted: false },
      ];
      // Load current data
      const existingContexts = await contextController.getAll();
      // Avoid duplicates by checking IDs
      const existingIds = new Set(existingContexts.map((ctx) => ctx.id));
      for (const context of testContexts) {
        if (!existingIds.has(context.id)) {
          await contextController.addContext(context);
        }
      }

      const contextWithPages = await contextController.assignOpenPagesToContext(
        testContexts[1].id
      );

      console.log("Context with pages:", contextWithPages);

      // Reload after insertions
      const updatedContexts = await contextController.getAll();
      setContexts(updatedContexts);
    };
    loadContexts();
  }, []);

  const closeAllTabs = async () => {
    try {
      await pagesService.closeAllTabs();
      console.log("All tabs closed successfully.");
    } catch (error) {
      console.error("Error closing tabs:", error);
    }
  };

  return (
    <div className="Contexts">
      <h2>Contexts</h2>

      <ul className="context-list">
        {contexts.map((context) => (
          <li className="context-item" key={context.id}>
            <div className="context-content">
              <h3 className="context-title">{context.name}</h3>
            </div>
          </li>
        ))}
      </ul>

      <div className="context-actions">
        <button id="add-context-button">Add Context</button>
      </div>

      <div className="tests">
        <button onClick={closeAllTabs}>Close all tabs</button>
      </div>
    </div>
  );
}

export default Contexts;
