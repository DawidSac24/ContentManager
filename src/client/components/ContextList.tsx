import { useEffect, useState } from "react";
import { ContextDTO } from "../../local-server/models/context.model";
import { ContextController } from "../../local-server/controllers/context.controller";
import "../styles/ContextList.css";

const contextController = ContextController.getInstance();

function ContextList() {
  const [contexts, setContexts] = useState<ContextDTO[]>([]);
  const [selectedId, setSelectedId] = useState<number | undefined>();

  useEffect(() => {
    const fetchContexts = async () => {
      try {
        const result = await contextController.getAll(); // ✅ await here
        setContexts(result);
        setSelectedId(contextController.selectedContext?.id); // restore if needed
      } catch (err) {
        console.error("Failed to load contexts", err);
      }
    };

    fetchContexts();
  }, []);

  const handleSelect = (context: ContextDTO) => {
    contextController.selectContext(context);
    setSelectedId(context.id); // triggers re-render
  };

  return (
    <ul>
      {contexts.map((context) => (
        <li key={context.id}>
          <button
            onClick={() => handleSelect(context)}
            className={selectedId === context.id ? "selected" : ""}
          >
            <h3>{context.name}</h3>
          </button>
        </li>
      ))}
    </ul>
  );
}

export default ContextList;
