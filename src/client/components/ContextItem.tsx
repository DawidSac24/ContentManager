import "../styles/ContextItem.css";

import Context from "./Context";
import ContextEdition from "./ContextEdition";

import { ContextDTO } from "../../local-server/models/context.model";

type Props = {
  context: ContextDTO;
  isSelected: boolean;
  isEditing: boolean;
  editedName: string;
  onSelect: () => void;
  onChange: (name: string) => void;
  onSave: () => void;
};

export default function ContextItem({
  context,
  isSelected,
  isEditing,
  editedName,
  onSelect,
  onChange,
  onSave,
}: Props) {
  return (
    <li>
      {isEditing ? (
        <ContextEdition />
      ) : (
        <Context
          context={context}
          isSelected={isSelected}
          onSelect={onSelect}
        />
      )}
    </li>
  );
}
