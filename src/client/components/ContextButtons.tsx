import { DropDownProps } from "../Props";
import { ContextState } from "../hooks/useContextState";

import { useContextActions } from "../hooks/useContextActions";

function ContextButtons({
  context,
  loadContexts,
  setContextState,
}: DropDownProps) {
  const { loadContext, saveContext, deleteContext } = useContextActions();

  const unselectContext = async () => {
    await loadContexts();
    setContextState(ContextState.default);
  };

  const handleLoad = async () => {
    await loadContext(context);
    unselectContext();
  };

  const handleSave = async () => {
    await saveContext(context);
    unselectContext();
  };

  const handleDelete = async () => {
    if (!context.id) {
      console.log("no context id");
      throw new Error("no context id");
    }

    await deleteContext(context.id);
    unselectContext();
  };

  return (
    <div
      className="h-8 w-40 gap-[6px]
     flex items-center justify-between"
    >
      <button
        className="button"
        onClick={() => setContextState(ContextState.edition)}
      >
        EDIT
      </button>
      <button className="button" onClick={handleLoad}>
        LOAD
      </button>
      <button className="button" onClick={handleSave}>
        SAVE
      </button>
      <button className="button" onClick={handleDelete}>
        DELETE
      </button>
    </div>
  );
}

export default ContextButtons;
