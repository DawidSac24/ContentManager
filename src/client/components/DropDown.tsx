import "../styles/DropDown.css";

import { DropDownPros } from "../Props";
import { ContextState } from "../hooks/useContextState";

function DropDown({ context, setContextState }: DropDownPros) {
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
        <button className="button">DELETE</button>
      </li>
    </ul>
  );
}

export default DropDown;
