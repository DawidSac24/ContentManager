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
}: Props) {
  return (
    <li>
      <button
        onClick={onSelect}
        // className={
        //   "context " + isSelected
        //     ? isEditing
        //       ? ""
        //       : "selected-context "
        //     : "" + isOpened
        //     ? "opened-context"
        //     : ""
        // }
        className={
          isSelected
            ? isEditing
              ? "context"
              : "context selected-context"
            : "context"
        }
      >
        {isEditing && isSelected ? (
          <div className="context-edition-container">
            <input
              type="text"
              value={editedName}
              onChange={(e) => onChange(e.target.value)}
              className="context-input"
            />
            <button className="save-context" onClick={onSave}>
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
