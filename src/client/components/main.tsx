import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../styles/index.css";
import Header from "./Header";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Header />
    <App />
  </StrictMode>
);
