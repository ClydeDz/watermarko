import "./Watermarko.css";

import Preview from "./components/preview";
import Editor from "./components/editor";
import Header from "./components/header";

import Toolbar from "./components/toolbar";

function Watermarko() {
  return (
    <>
      <Header />
      <Toolbar />
      <div className="container">
        <Preview />
      </div>
    </>
  );
}

export default Watermarko;
