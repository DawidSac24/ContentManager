import "../styles/ContextsList.css";

import { useContexts } from "../hooks/useContexts";

import ContextItem from "./ContextItem";
import AddContext from "./AddContext";

export default function ContextsList() {
  const {
    contexts,
    openedContext,
    selectedContext,
    isEditing,
    editedName,
    openContext,
    selectContext,
    addContext,
    updateContext,
    deleteContext,
    savePages,
    setEditedName,
    setIsEditing,
  } = useContexts();

  const handleSave = () => {
    updateContext(editedName);
  };

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
