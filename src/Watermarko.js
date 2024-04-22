import "./Watermarko.css";

import Preview from "./components/preview";
import Editor from "./components/editor";
import Header from "./components/header";

function Watermarko() {
  return (
    <>
      <Header />
      <div className="container">
        <Editor />
        <Preview />
      </div>
    </>
  );
}

export default Watermarko;
