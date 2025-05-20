import "../styles/ContextsList.css";

import { useContextlist } from "../hooks/useContextList";

import AddContext from "./AddContext";
import Context from "./Contexts/Context";

export default function ContextsList() {
  const { contexts, loadContexts, addContext } = useContextlist();

  return (
    <div>
      <ul>
        {contexts.map((context) => (
          <Context context={context} loadContexts={loadContexts} />
        ))}
      </ul>

      <AddContext onAdd={addContext} />
    </div>
  );
}
