import { useContextlist } from "../hooks/useContextList";

import AddContext from "./AddContext";
import Context from "./Contexts/Context";

export default function ContextsList() {
  const { contexts, loadContexts, addContext } = useContextlist();

  return (
    <div>
      <div className="list-container h-60 overflow-y-scroll">
        <ul className="flex flex-col items-center justify-between gap-2">
          {contexts.map((context) => (
            <Context context={context} loadContexts={loadContexts} />
          ))}
        </ul>
      </div>

      <AddContext onAdd={addContext} />
    </div>
  );
}
