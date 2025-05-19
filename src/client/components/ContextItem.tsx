import "../styles/ContextItem.css";

import Context from "./Context";
import ContextEdition from "./ContextEdition";

import { ContextDTO } from "../../local-server/models/context.model";
import { useState } from "react";

type Props = {
  context: ContextDTO;
  isSelected: boolean;
  isEditing: boolean;
  setSelectedContextId: (id: number | undefined) => void;
  unselectContext: () => void;
  setIsEditing: (state: boolean) => void;
  editContext: (context: ContextDTO) => void;
};

export default function ContextItem({
  context,
  isSelected,
  isEditing,
  setSelectedContextId,
  unselectContext,
  setIsEditing,
  editContext,
}: Props) {
  return (
    <li>
      {isEditing ? (
        <ContextEdition />
      ) : (
        <Context
          context={context}
          isSelected={isSelected}
          setSelectedContextId={setSelectedContextId}
          unselectContext={unselectContext}
          setIsEditing={setIsEditing}
        />
      )}
    </li>
  );
}
