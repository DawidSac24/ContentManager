import ContextList from "./ContextList";

function Contexts() {
  return (
    <div>
      <h2>Contexts</h2>

      <ContextList />

      <div className="context-actions">
        <button id="add-context-button">Add Context</button>
      </div>
    </div>
  );
}

export default Contexts;
