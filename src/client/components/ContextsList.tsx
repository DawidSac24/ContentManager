import "../styles/ContextsList.css";

import { useContextlist } from "../hooks/useContextList";

import ContextItem from "./ContextItem";
import AddContext from "./AddContext";

export default function ContextsList() {
  return (
    <div>
      <ul>
        {contexts.map((context) => (
          <ContextItem
            key={context.id}
            context={context}
            isSelected={selectedContext?.id === context.id}
            isEditing={isEditing}
            editedName={editedName}
            onSelect={() => selectContext(context)}
            onChange={setEditedName}
            onSave={handleSave}
          />
        ))}
        <li></li>
      </ul>

      <AddContext onAdd={() => addContext({ name: "New Context" })} />
    </div>
  );
}
