import "../styles/ContextsList.css";
import { ContextController } from "../../../local-server/src/controllers/context.controller";
import { ContextDTO } from "../../../local-server/src/models/context.model";

function ContextsList() {
  const contextController = ContextController.getInstance();

  function getContexts(): ContextDTO[] {
    const contexts: ContextDTO[] = [];

    contextController.getAll().then((result: ContextDTO[]) => {
      for (const context of result) {
        contexts.push(context);
      }
    });

    return contexts;
  }

  function renderContexts() {
    const contexts: ContextDTO[] = getContexts();

    if (contexts.length === 0) {
      return <p>No contexts available</p>;
    }

    return contexts.map((context: ContextDTO) => (
      <li key={context.id}>
        <h3>{context.name}</h3>
        <p>Pages: {context.pages.join(", ")}</p>
      </li>
    ));
  }

  return (
    <div className="contexts-list">
      <h2>Contexts List</h2>
      <ul>{renderContexts()}</ul>
    </div>
  );
}

export default ContextsList;
