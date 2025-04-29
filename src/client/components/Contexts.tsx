import { Context } from "../../local-server/models/context.model";

function Contexts() {
  const contexts: Context[] = [
    { id: 1, name: "Context 1", pages: [], isDeleted: false },
    { id: 2, name: "Context 2", pages: [], isDeleted: false },
    { id: 3, name: "Context 3", pages: [], isDeleted: false },
  ];

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
