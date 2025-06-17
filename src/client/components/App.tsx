import Header from "./Header";
import ContextsList from "./ContextsList";

function App() {
  return (
    <div
      className=" w-[83%]
      flex flex-col justify-around items-center
      bg-neutral-900"
    >
      <Header />
      <div className="h-64 w-[100%] flex flex-col items-center justify-between">
        <ContextsList />
      </div>
    </div>
  );
}

export default App;
