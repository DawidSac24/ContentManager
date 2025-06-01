import "../styles/ContextsList.css";

import { useContextlist } from "../hooks/useContextList";

import { useState } from "react";

import AddContext from "./AddContext";
import Context from "./Contexts/Context";

export default function ContextsList() {
  const { contexts, loadContexts, addContext } = useContextlist();
  undefined;

  return (
    <div>
      <div className="list-container">
        <ul>
          {contexts.map((context) => (
            <Context context={context} loadContexts={loadContexts} />
          ))}
        </ul>
      </div>

      <AddContext onAdd={addContext} />
    </div>
  );
}
