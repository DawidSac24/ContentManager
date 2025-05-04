import "../styles/Contexts.css";

import { useState, useEffect } from "react";

import {
  ContextDTO,
  NewContextDTO,
} from "../../local-server/models/context.model";
import { ContextController } from "../../local-server/controllers/context.controller";

const contextController = ContextController.getInstance();

function Contexts() {
  const [contexts, setContexts] = useState<ContextDTO[]>([]);
  const [selectedId, setSelectedId] = useState<number | undefined>();
  const [isEditing, setEditing] = useState<boolean>();
  const [newContext, setNewContext] = useState<NewContextDTO | null>(null); // Track new context state

  const handleSelect = (context: ContextDTO) => {
    contextController.selectContext(context);
    setSelectedId(context.id); // triggers re-render
  };

  const edit = () => {
    setEditing(!isEditing);
  };

  function handleDisplay(contextId: number | undefined): boolean {
    if (!contextId) throw new Error("no contextId");

    if (!isEditing) return true;

    if (selectedId === contextId) return false;

    return true;
  }

  const handleDelete = async () => {
    const selected = contextController.selectedContext;
    if (!selected) return;

    try {
      await contextController.deleteContext();
      contextController.selectedContext = undefined;

      // Refresh the contexts list in the main app
      const updated = await contextController.getAll();
      setContexts(updated);
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  const addContext = () => {
    setNewContext({ name: "New Context" }); // This will trigger useEffect
  };

  useEffect(() => {
    const load = async () => {
      const result = await contextController.getAll();
      setContexts(result);
    };
    load();
  }, []);

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

  return (
    <div>
      <ul>
        {contexts.map((context) => (
          <li key={context.id}>
            <button
              onClick={() => handleSelect(context)}
              className={
                selectedId === context.id
                  ? "selected-context context"
                  : "context"
              }
            >
              {handleDisplay(context.id) ? <h3>{context.name}</h3> : null}
              {!handleDisplay(context.id) ? (
                <input
                  type="text"
                  placeholder={context.name}
                  className="border px-2 py-1"
                />
              ) : null}
            </button>
          </li>
        ))}
        <li>
          <button className="context add-context-button" onClick={addContext}>
            <h3>Add Context</h3>
          </button>
        </li>
      </ul>

      <div className="component-buttons">
        <button className="component-button" onClick={edit}>
          EDIT
        </button>
        <button className="component-button">LOAD</button>
        <button className="component-button" onClick={handleDelete}>
          DELETE
        </button>
      </div>
    </div>
  );
}

export default Contexts;
