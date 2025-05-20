import "../styles/DropDown.css";

import { DropDownPros } from "../Props";
import { ContextState } from "../hooks/useContextState";

import { useContextActions } from "../hooks/useContextActions";

function DropDown({
  context,
  loadContexts,
  openContext,
  setContextState,
}: DropDownPros) {
  const { loadContext, saveContext, deleteContext } = useContextActions();

  const unselectContext = () => {
    loadContexts();
    setContextState(ContextState.default);
  };

  const handleLoad = () => {
    loadContext(context);
    openContext();
    unselectContext();
  };

  const handleSave = () => {
    saveContext(context);
    unselectContext();
  };

  const handleDelete = () => {
    if (!context.id) {
      console.log("no context id");
      throw new Error("no context id");
    }

    deleteContext(context.id);
    unselectContext();
  };

  return (
    <ul className="drop-down">
      <li>
        <button
          className="button"
          onClick={() => setContextState(ContextState.edition)}
        >
          EDIT
        </button>
      </li>
      <li>
        <button className="button" onClick={handleLoad}>
          LOAD
        </button>
      </li>
      <li>
        <button className="button" onClick={handleSave}>
          SAVE
        </button>
      </li>
      <li>
        <button className="button" onClick={handleDelete}>
          DELETE
        </button>
      </li>
    </ul>
  );
}

export default DropDown;
