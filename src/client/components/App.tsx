import "../styles/App.css";

import Header from "./Header";
import Contexts from "./Contexts";

function App() {
  return (
    <div className="app-container">
      <Header />
      <div className="main-content">
        <Contexts />
      </div>
    </div>
  );
}

export default App;
