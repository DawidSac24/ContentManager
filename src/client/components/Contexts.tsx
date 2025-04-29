import { ContextController } from "../../local-server/controllers/context.controller";
import { ContextDTO } from "../../local-server/models/context.model";

function Contexts() {
  const contextController = ContextController.getInstance();
  const testContexts: ContextDTO[] = [
    {
      id: 1,
      name: "Test Context 1",
      pages: [],
      isDeleted: false,
    },
    {
      id: 2,
      name: "Test Context 2",
      pages: [],
      isDeleted: false,
    },
    {
      id: 3,
      name: "Test Context 3",
      pages: [],
      isDeleted: false,
    },
  ];

  for (const context of testContexts) {
    contextController.addContext(context);
  }

  let contexts = contextController.getAll();

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
