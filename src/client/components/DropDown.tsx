import "../styles/DropDown.css";

import { DropDownPros } from "../Props";
import { ContextState } from "../hooks/useContextState";

import { useContextActions } from "../hooks/useContextActions";

function DropDown({ context, loadContexts, setContextState }: DropDownPros) {
  const { deleteContext } = useContextActions();

  const handleDelete = () => {
    if (!context.id) {
      console.log("no context id");
      throw new Error("no context id");
    }

    deleteContext(context.id);

    loadContexts();

    setContextState(ContextState.default);
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
        <button className="button">OPEN</button>
      </li>
      <li>
        <button className="button">SAVE</button>
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
