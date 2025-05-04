import "../styles/Contexts.css";

import { useState, useEffect } from "react";
import { Props } from "./App";

import {
  ContextDTO,
  NewContextDTO,
} from "../../local-server/models/context.model";
import { ContextController } from "../../local-server/controllers/context.controller";

const contextController = ContextController.getInstance();

function Contexts({ contexts, setContexts }: Props) {
  if (!contexts || !setContexts) {
    throw new Error("contexts or setContexts is missing in Contexts.tsx");
  }

  const [selectedId, setSelectedId] = useState<number | undefined>();
  const [newContext, setNewContext] = useState<NewContextDTO | null>(null); // Track new context state

  const handleSelect = (context: ContextDTO) => {
    contextController.selectContext(context);
    setSelectedId(context.id); // triggers re-render
  };

  useEffect(() => {
    if (newContext) {
      const add = async () => {
        await contextController.addContext(newContext);
        const result = await contextController.getAll();
        setContexts(result); // Refresh the contexts after adding
      };

      add();
    }
  }, [newContext, setContexts]); // Depend on newContext to trigger the effect

  const addContext = () => {
    setNewContext({ name: "New Context" }); // This will trigger useEffect
  };

  return (
    <ul>
      {contexts.map((context) => (
        <li key={context.id}>
          <button
            onClick={() => handleSelect(context)}
            className={
              selectedId === context.id ? "selected-context context" : "context"
            }
          >
            <h3>{context.name}</h3>
          </button>
        </li>
      ))}
      <li>
        <button className="context add-context-button" onClick={addContext}>
          <h3>Add Context</h3>
        </button>
      </li>
    </ul>
  );
}

export default Contexts;
