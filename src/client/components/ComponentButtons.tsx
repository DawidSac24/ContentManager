import "../styles/ComponentButtons.css";

import { Props } from "./App";

import { ContextController } from "../../local-server/controllers/context.controller";

function ComponentButtons({ setContexts }: Props) {
  const contextController = ContextController.getInstance();

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

  return (
    <div className="component-buttons">
      <button className="component-button">EDIT</button>
      <button className="component-button">LOAD</button>
      <button className="component-button" onClick={() => handleDelete}>
        DELETE
      </button>
    </div>
  );
}

export default ComponentButtons;
