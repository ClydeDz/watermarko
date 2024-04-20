import "./Watermarko.css";

import Preview from "./components/preview";
import Editor from "./components/editor";

// https://html2canvas.hertzen.com/
// http://fabricjs.com/

function Watermarko() {
  return (
    <div className="container">
      <Editor />
      <Preview />
    </div>
  );
}

export default Watermarko;
