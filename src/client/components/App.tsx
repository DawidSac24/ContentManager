import "../styles/App.css";

import Header from "./Header";
import ContextsList from "./ContextsList";

function App() {
  return (
    <div className="app-container">
      <Header />
      <div className="main-content">
        <ContextsList />
      </div>
    </div>
  );
}

export default App;
