import {
  loadContexts,
  testDatabase,
} from "../client-services/context-list.service";

function ContextList() {
  testDatabase();

  let contexts = loadContexts();

  return (
    <ul>
      {contexts.map((context) => (
        <li key={context.id}>
          <button>
            <h3>{context.name}</h3>
          </button>
        </li>
      ))}
    </ul>
  );
}

export default ContextList;
