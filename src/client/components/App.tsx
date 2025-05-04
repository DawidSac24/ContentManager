import "../styles/App.css";

import { useState, useEffect } from "react";

import { ContextDTO } from "../../local-server/models/context.model";
import { ContextController } from "../../local-server/controllers/context.controller";

import Header from "./Header";
import Contexts from "./Contexts";
import Footer from "./Footer";

export interface Props {
  contexts?: ContextDTO[];
  setContexts?: React.Dispatch<React.SetStateAction<ContextDTO[]>>;
}

function App() {
  const contextController = ContextController.getInstance();

  const [contexts, setContexts] = useState<ContextDTO[]>([]);

  useEffect(() => {
    const load = async () => {
      const result = await contextController.getAll();
      setContexts(result);
    };
    load();
  }, []);

  return (
    <div className="app-container">
      <Header />
      <div className="main-content">
        <Contexts contexts={contexts} setContexts={setContexts} />
      </div>
      <Footer setContexts={setContexts} />
    </div>
  );
}

export default App;
