import "../styles/Contexts.css";
import ContextList from "./ContextList";
import { closeAllTabs } from "../client-services/context-list.service";

function Contexts() {
  return (
    <div id="contexts-list">
      <h2>Contexts</h2>

      <ContextList />

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
