import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../styles/index.css";
import Header from "./Header";
import App from "./App";
import Footer from "./Footer";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Header />
    <App />
    <Footer />
  </StrictMode>
);
