import { ContextController } from "../../local-server/controllers/context.controller";

function Contexts() {
  const contextController = ContextController.getInstance();
  let contexts = contextController.getContexts();

  return (
    <div className="Contexts">
      <h2>Contexts</h2>
      <ul>
        {contexts.map((context) => (
          <li key={context.id}>
            <h3>{context.name}</h3>
            <p>Pages: {context.pages.length}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Contexts;
