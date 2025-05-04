import "../styles/ContextsList.css";

import { useContexts } from "../hooks/useContexts";

import ContextItem from "./ContextItem";
import ContextButtons from "./ContextButtons";

export default function ContextsList() {
  const {
    contexts,
    openedContext,
    selectedContext,
    isEditing,
    editedName,
    selectContext,
    addContext,
    updateContext,
    deleteContext,
    setEditedName,
    setIsEditing,
    loadPages,
    savePages,
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
            isOpened={openedContext?.id === context.id}
            isSelected={selectedContext?.id === context.id}
            isEditing={isEditing}
            editedName={editedName}
            onSelect={() => selectContext(context)}
            onChange={setEditedName}
            onSave={handleSave}
          />
        ))}
        <li>
          <button
            className="context add-context-button"
            onClick={() => addContext({ name: "New Context" })}
          >
            <h3>Add Context</h3>
          </button>
        </li>
      </ul>

      <ContextButtons
        onEdit={() => setIsEditing(!isEditing)}
        onDelete={deleteContext}
        onLoadPages={loadPages}
        onSavePages={savePages}
      />
    </div>
  );
}
