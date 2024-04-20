import { useEffect, useState } from "react";
import "./Watermarko.css";
import FontPicker from "font-picker-react";
import { useDebounce } from "use-debounce";
import { download, createWatermark } from "./helpers/utility";
import { useSelector, useDispatch } from "react-redux";
import Preview from "./components/preview";

function Watermarko() {
  const [watermarkText, setWatermarkText] = useState("Watermarko");
  const [debouncedWatermarkText] = useDebounce(watermarkText, 500);
  const [color, setColor] = useState("#FFFFFF");
  const [debouncedColor] = useDebounce(color, 500);
  const [activeFontFamily, setActiveFontFamily] = useState("Roboto");
  const [topPosition, setTopPosition] = useState(20);
  const [debouncedTopPosition] = useDebounce(topPosition, 500);
  const [leftPosition, setLeftPosition] = useState(0);
  const [debouncedLeftPosition] = useDebounce(leftPosition, 500);
  const [fontSize, setFontSize] = useState(20);
  const [debouncedFontSize] = useDebounce(fontSize, 1500);

  const imageFilename = useSelector((state) => state.image.name);
  const dispatch = useDispatch();

  useEffect(() => {
    createWatermark({
      activeFontFamily,
      watermarkText: debouncedWatermarkText,
      color: debouncedColor,
      position: { x: debouncedLeftPosition, y: debouncedTopPosition },
      fontSize: debouncedFontSize,
    });
  }, [
    debouncedWatermarkText,
    activeFontFamily,
    debouncedColor,
    debouncedTopPosition,
    debouncedLeftPosition,
    debouncedFontSize,
    imageFilename,
  ]);

  return (
    <div className="container">
      <div id="editor" className="row">
        <div>
          <label for="watermarkText">Watermark text</label>
          <input
            type="text"
            value={watermarkText}
            id="watermarkText"
            onChange={(e) => setWatermarkText(e.target.value)}
          />
        </div>

        <div>
          <label for="color">Watermark color</label>
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            name="color"
          />
        </div>

        <div>
          <label for="fontsize">Font size</label>
          <input
            type="text"
            value={fontSize}
            onChange={(e) => setFontSize(e.target.value)}
            name="fontsize"
          />
        </div>

        <div>
          <label for="top">Top position</label>
          <input
            type="text"
            value={topPosition}
            onChange={(e) => setTopPosition(e.target.value)}
            name="top"
          />
        </div>

        <div>
          <label for="left">Left position</label>
          <input
            type="text"
            value={leftPosition}
            onChange={(e) => setLeftPosition(e.target.value)}
            name="left"
          />
        </div>

        <div>
          <label for="font">Font style</label>
          <FontPicker
            apiKey="AIzaSyAiWXiHsvjd7BO-U7cI3c_bn6x__yK1FfY"
            activeFontFamily={activeFontFamily}
            pickerId="font"
            onChange={(nextFont) => setActiveFontFamily(nextFont.family)}
          />
        </div>

        <div>
          <button type="button" onClick={() => download({ imageFilename })}>
            Download
          </button>
        </div>
      </div>
      <Preview />
    </div>
  );
}

export default Watermarko;
