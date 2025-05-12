import "../styles/ContextButtons.css";

type Props = {
  onAdd: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onOpen: () => void;
};

export default function ContextButtons({
  onAdd,
  onEdit,
  onDelete,
  onOpen,
}: Props) {
  return (
    <div className="component-buttons">
      <div className="add-context-button-container">
        <button className="add-context-button context" onClick={onAdd}>
          <h3>Add Context</h3>
        </button>
      </div>
      <div className="action-buttons">
        <button className="component-button " onClick={onEdit}>
          EDIT
        </button>

        <button className="component-button" onClick={onOpen}>
          OPEN
        </button>
        <button className="component-button" onClick={onDelete}>
          DELETE
        </button>
      </div>
    </div>
  );
}
