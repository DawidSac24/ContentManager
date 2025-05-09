import "../styles/ContextItem.css";

import { ContextDTO } from "../../local-server/models/context.model";

type Props = {
  context: ContextDTO;
  isOpened: boolean;
  isSelected: boolean;
  isEditing: boolean;
  editedName: string;
  onSelect: () => void;
  onChange: (name: string) => void;
  onSave: () => void;
  onSavePages: () => void;
};

export default function ContextItem({
  context,
  isOpened,
  isSelected,
  isEditing,
  editedName,
  onSelect,
  onChange,
  onSave,
  onSavePages,
}: Props) {
  let buttonClassName: string = "contetext";
  if (isSelected) if (!isEditing) buttonClassName += " selected-context";
  if (isOpened) buttonClassName += " opened-context";

  return (
    <li>
      <button onClick={onSelect} className={buttonClassName}>
        {(isEditing && isSelected) || isOpened ? (
          <div className="context-edition-container">
            <input
              type="text"
              value={editedName}
              onChange={(e) => onChange(e.target.value)}
              className="context-input"
            />
            <button
              className="save-context"
              onClick={isOpened ? onSavePages : onSave}
            >
              SAVE
            </button>
          </div>
        ) : (
          <h3>{context.name}</h3>
        )}
      </button>
    </li>
  );
}
