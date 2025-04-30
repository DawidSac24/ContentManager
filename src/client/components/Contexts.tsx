import "../styles/Contexts.css";
import { useEffect, useState } from "react";
import { ContextController } from "../../local-server/controllers/context.controller";
import { ContextDTO } from "../../local-server/models/context.model";

function Contexts() {
  const contextController = ContextController.getInstance();
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
      // Reload after insertions
      const updatedContexts = await contextController.getAll();
      setContexts(updatedContexts);
    };
    loadContexts();
  }, []);

  return (
    <div className="Contexts">
      <h2>Contexts</h2>
      <ul className="context-list">
        {contexts.map((context) => (
          <li className="context-item" key={context.id}>
            <div className="context-content">
              <h3 className="context-item">{context.name}</h3>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Contexts;
