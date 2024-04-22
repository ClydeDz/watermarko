import "./Watermarko.css";
// import { fabric } from "fabric";
// import { useRef, useEffect } from "react";
// import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
// import Preview from "./components/preview";
// import Editor from "./components/editor";
import React from "react";
import { fabric } from "fabric";
import fuji from "./fuji.jpg";
import { DraggableTextEditor } from "expo-draggable-textfield";

// https://html2canvas.hertzen.com/
// http://fabricjs.com/
// https://stackoverflow.com/a/22388805

function Watermarko() {
  const fabricRef = React.useRef(null);
  const canvasRef = React.useRef(null);

  React.useEffect(() => {
    const initFabric = () => {
      fabricRef.current = new fabric.Canvas(canvasRef.current);
      fabricRef.current.setHeight(document.documentElement.clientHeight / 2);
      fabricRef.current.setWidth(document.documentElement.clientWidth / 2);
    };

    const addRectangle = () => {
      const rect = new fabric.IText("test", {
        fontFamily: "Helvetica",
        fill: "#333",
      });
      fabricRef.current.insertAt(rect, 1);
    };

    const addImage = () => {
      var imgElement = document.getElementById("my-image");
      const img = new fabric.Image(imgElement, {
        lockRotation: true,
        scaleX: 0.2,
        scaleY: 0.2,
      });
      fabricRef.current.insertAt(img, 0);
    };

    const disposeFabric = () => {
      fabricRef.current.dispose();
    };

    initFabric();
    addRectangle();
    addImage();

    return () => {
      disposeFabric();
    };
  }, []);

  const onDownload = () => {
    var download = document.getElementById("download");
    var image = fabricRef.current.toDataURL({
      quality: 1,
      enableRetinaScaling: true,
      multiplier: 1, // SCALES THE IMAGE SUPER BIG
    }); //.replace("image/png", "image/octet-stream");
    console.log(image);
    const link = document.createElement("a");
    link.href = image;
    link.download = "watermarko.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    // download.setAttribute("href", image);
    // download.setAttribute("download", "archive.png");
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
      const img = new fabric.Image(hiddenImage, {
        lockRotation: true,
        hasControls: false,
        lockMovementY: true,
        lockMovementX: true,
        selectable: false,
      });
      fabricRef.current.insertAt(img, 0);
      fabricRef.current.setHeight(document.documentElement.clientHeight * 0.8);
      fabricRef.current.setWidth(img.sca);
    });
  };

  return (
    <div>
      <DraggableTextEditor
        placeholder="Enter text here"
        onChangeText={(text) => console.log(text)}
      />
      <button onClick={onDownload}>Download</button>
      <input
        id="upload"
        type="file"
        accept="image/*"
        onChange={(e) => onFileUpload(e)}
      />
      <img id="hiddenImage" style={{ display: "none" }} />
      <canvas ref={canvasRef} id="editorCanvas" />

      {/* <button onClick={onAddCircle}>Add circle</button>
      <button onClick={onAddRectangle}>Add Rectangle</button> */}
      {/* <a id="download" download="triangle.png"></a> */}

      {/* <FabricJSCanvas className="sample-canvas" onReady={onReady} /> */}
      {/* <Editor />
      <Preview /> */}
    </div>
  );
}

export default Watermarko;
