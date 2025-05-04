import "../styles/Footer.css";

import { Props } from "./App";

import ComponentButtons from "./ComponentButtons";

function Footer({ setContexts }: Props) {
  return (
    <footer>
      <ComponentButtons setContexts={setContexts} />
    </footer>
  );
}

export default Footer;
