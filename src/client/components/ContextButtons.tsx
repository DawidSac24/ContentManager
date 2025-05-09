import "../styles/ContextButtons.css";

type Props = {
  onEdit: () => void;
  onDelete: () => void;
  onOpen: () => void;
};

export default function ContextButtons({ onEdit, onDelete, onOpen }: Props) {
  return (
    <div className="component-buttons">
      <button className="component-button" onClick={onEdit}>
        EDIT
      </button>

      <button className="component-button" onClick={onOpen}>
        OPEN
      </button>
      <button className="component-button" onClick={onDelete}>
        DELETE
      </button>
    </div>
  );
}
