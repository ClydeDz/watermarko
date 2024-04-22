import "./Watermarko.css";
// import { fabric } from "fabric";
// import { useRef, useEffect } from "react";
// import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
// import Preview from "./components/preview";
// import Editor from "./components/editor";
import React from "react";
import fuji from "./fuji.jpg";
import Overdrag from "overdrag";

// https://html2canvas.hertzen.com/
// http://fabricjs.com/
// https://stackoverflow.com/a/22388805

function Watermarko() {
  const [xyz, setxyz] = React.useState("aaa");
  const onDownload = () => {
    // var download = document.getElementById("download");
    // var image = fabricRef.current.toDataURL({
    //   quality: 1,
    //   enableRetinaScaling: true,
    //   multiplier: 1, // SCALES THE IMAGE SUPER BIG
    // }); //.replace("image/png", "image/octet-stream");
    // console.log(image);
    // const link = document.createElement("a");
    // link.href = image;
    // link.download = "watermarko.png";
    // document.body.appendChild(link);
    // link.click();
    // document.body.removeChild(link);
    // // download.setAttribute("href", image);
    // // download.setAttribute("download", "archive.png");
  };

  const fileToDataUri = (field) => {
    return new Promise((resolve) => {
      const reader = new FileReader();

      reader.addEventListener("load", () => {
        resolve(reader.result);
      });

      reader.readAsDataURL(field);
    });
  };

  const onFileUpload = async (e) => {
    const file = e.target.files[0];
    const hiddenImage = document.getElementById("hiddenImage");

    if (!file) return;

    hiddenImage.src = await fileToDataUri(file);

    hiddenImage.addEventListener("load", async () => {
      hiddenImage.style.display = "";
      const element = document.getElementById("watermarkText");
      const overdrag = new Overdrag({
        element: element,
      });
      overdrag.on(Overdrag.EVENTS.DRAG_END, (e) => {
        console.log(e);
      });
    });
  };

  return (
    <div className="container">
      <div className="row">
        <button onClick={onDownload}>Download</button>
        <input
          id="upload"
          type="file"
          accept="image/*"
          onChange={(e) => onFileUpload(e)}
        />
      </div>
      <div className="row">
        <div id="imageContainer">
          <img id="hiddenImage" />
          <input
            type="text"
            value={xyz}
            id="watermarkText"
            onChange={(e) => setxyz(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

export default Watermarko;
