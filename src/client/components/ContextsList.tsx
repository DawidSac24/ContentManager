import "../styles/ContextsList.css";

import { useContextlist } from "../hooks/useContextList";

import ContextItem from "./ContextItem";
import AddContext from "./AddContext";

export default function ContextsList() {
  const { contexts } = useContextlist;

  return (
    <div>
      <ul>
        {contexts.map((context) => (
          <ContextItem key={context.id} context={context} />
        ))}
        <li></li>
      </ul>

      <AddContext onAdd={() => addContext({ name: "New Context" })} />
    </div>
  );
}
