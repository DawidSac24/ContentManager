import "../styles/ContextsList.css";

import { useContextlist } from "../hooks/useContextList";

import ContextItem from "./ContextItem";
import AddContext from "./AddContext";
import Context from "./Context";

export default function ContextsList() {
  const { contexts, addContext } = useContextlist();
  const {
    selectedContextId,
    setSelectedContextId,
    unselectContext,
  } = useContextlist();
  const { isEditing, setIsEditing, editContext } = useContextlist();

  return (
    <div>
      <ul>
        {contexts.map((context) => (
          <ContextItem
            key={context.id}
            context={context}
            isSelected={selectedContextId === context.id}
            setSelectedContextId={() => setSelectedContextId(context.id)}
            unselectContext={unselectContext}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            editContext={editContext}
          />
        ))}
      </ul>

      <AddContext onAdd={addContext} />
    </div>
  );
}
