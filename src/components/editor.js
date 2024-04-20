import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import FontPicker from "font-picker-react";
import { useDebounce } from "use-debounce";
import {
  setColor,
  setFontFamily,
  setFontSize,
  setLeftPosition,
  setTopPosition,
  setWatermarkText,
} from "../redux/editorSlice";
import { createWatermark, download } from "../helpers/utility";

const DEBOUNCE_DELAY = 500;

function Editor() {
  const dispatch = useDispatch();

  const {
    watermarkText,
    color,
    fontSize,
    fontFamily,
    topPosition,
    leftPosition,
  } = useSelector((state) => state.editor);
  const { name, extension, size } = useSelector((state) => state.image);

  const [debouncedWatermarkText] = useDebounce(watermarkText, DEBOUNCE_DELAY);
  const [debouncedColor] = useDebounce(color, DEBOUNCE_DELAY);
  const [debouncedTopPosition] = useDebounce(topPosition, DEBOUNCE_DELAY);
  const [debouncedLeftPosition] = useDebounce(leftPosition, DEBOUNCE_DELAY);
  const [debouncedFontSize] = useDebounce(fontSize, DEBOUNCE_DELAY);
  const [debouncedFontFamily] = useDebounce(fontFamily, DEBOUNCE_DELAY * 3);

  useEffect(() => {
    createWatermark({
      activeFontFamily: debouncedFontFamily,
      watermarkText: debouncedWatermarkText,
      color: debouncedColor,
      position: { x: debouncedLeftPosition, y: debouncedTopPosition },
      fontSize: debouncedFontSize,
    });
  }, [
    debouncedWatermarkText,
    debouncedFontFamily,
    debouncedColor,
    debouncedTopPosition,
    debouncedLeftPosition,
    debouncedFontSize,
    name,
  ]);

  return (
    <div id="editor" className="row">
      <div>
        <label for="watermarkText">Watermark text</label>
        <input
          type="text"
          value={watermarkText}
          id="watermarkText"
          onChange={(e) => dispatch(setWatermarkText(e.target.value))}
        />
      </div>

      <div>
        <label for="color">Watermark color</label>
        <input
          type="color"
          value={color}
          onChange={(e) => dispatch(setColor(e.target.value))}
          name="color"
        />
      </div>

      <div>
        <label for="fontsize">Font size</label>
        <input
          type="text"
          value={fontSize}
          onChange={(e) => dispatch(setFontSize(e.target.value))}
          name="fontsize"
        />
      </div>

      <div>
        <label for="top">Top position</label>
        <input
          type="text"
          value={topPosition}
          onChange={(e) => dispatch(setTopPosition(e.target.value))}
          name="top"
        />
      </div>

      <div>
        <label for="left">Left position</label>
        <input
          type="text"
          value={leftPosition}
          onChange={(e) => dispatch(setLeftPosition(e.target.value))}
          name="left"
        />
      </div>

      <div>
        <label for="font">Font style</label>
        <FontPicker
          apiKey="AIzaSyAiWXiHsvjd7BO-U7cI3c_bn6x__yK1FfY"
          activeFontFamily={fontFamily}
          pickerId="font"
          onChange={(nextFont) => dispatch(setFontFamily(nextFont.family))}
        />
      </div>

      <div>
        <button
          type="button"
          onClick={() =>
            download({ imageFilename: `watermarko-${name}.${extension}` })
          }
        >
          Download
        </button>
      </div>
    </div>
  );
}

export default Editor;
