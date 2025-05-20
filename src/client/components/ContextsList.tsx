import "../styles/ContextsList.css";

import { useContextlist } from "../hooks/useContextList";

import { useState } from "react";

import AddContext from "./AddContext";
import Context from "./Contexts/Context";

export default function ContextsList() {
  const { contexts, loadContexts, addContext } = useContextlist();
  const [openedContext, setOpenedContext] = useState<number | undefined>(
    undefined
  );

  return (
    <div>
      <ul>
        {contexts.map((context) => (
          <Context
            context={context}
            isOpened={openedContext === context.id}
            loadContexts={loadContexts}
            openContext={() => setOpenedContext(context.id)}
          />
        ))}
      </ul>

      <AddContext onAdd={addContext} />
    </div>
  );
}
