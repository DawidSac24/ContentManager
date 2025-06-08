import Header from "./Header";
import ContextsList from "./ContextsList";

function App() {
  return (
    <div
      className="
      flex flex-col justify-around items-center
      bg-neutral-800"
    >
      <Header />
      <div className="h-64 flex flex-col items-center justify-between">
        <ContextsList />
      </div>
    </div>
  );
}

export default App;
