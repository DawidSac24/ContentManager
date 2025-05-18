import "../styles/AddContext.css";

type Props = {
  onAdd: () => void;
};

function AddContext({ onAdd }: Props) {
  return (
    <div className="add-context-button-container">
      <button className="add-context-button context" onClick={onAdd}>
        <h3>Add Context</h3>
      </button>
    </div>
  );
}

export default AddContext;
