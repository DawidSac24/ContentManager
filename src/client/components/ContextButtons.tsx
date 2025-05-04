import "../styles/ContextButtons.css";

type Props = {
  onEdit: () => void;
  onDelete: () => void;
  onLoadPages: () => void;
  onSavePages: () => void;
};

export default function ContextButtons({
  onEdit,
  onDelete,
  onLoadPages: onLoad,
  onSavePages: onSave,
}: Props) {
  return (
    <div className="component-buttons">
      <button className="component-button" onClick={onEdit}>
        EDIT
      </button>
      <button className="component-button" onClick={onSave}>
        SAVE
      </button>
      <button className="component-button" onClick={onLoad}>
        LOAD
      </button>
      <button className="component-button" onClick={onDelete}>
        DELETE
      </button>
    </div>
  );
}
