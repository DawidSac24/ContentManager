import "../styles/App.css";

import Header from "./Header";
import ContextsList from "./ContextsList";

function App() {
  return (
    <div
      className="w-64 h-80
      flex-row justify-around items-center
      bg-"
    >
      <Header />
      <div className="main-content">
        <ContextsList />
      </div>
    </div>
  );
}

export default App;
