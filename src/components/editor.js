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
import { createWatermark, downloadWatermarkoImage } from "../helpers/utility";

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
  const { name, extension } = useSelector((state) => state.image);

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
        <label htmlFor="watermarkText">Watermark text</label>
        <input
          type="text"
          value={watermarkText}
          id="watermarkText"
          onChange={(e) => dispatch(setWatermarkText(e.target.value))}
        />
      </div>

      <div>
        <label htmlFor="color">Watermark color</label>
        <input
          type="color"
          value={color}
          onChange={(e) => dispatch(setColor(e.target.value))}
          name="color"
        />
      </div>

      <div>
        <label htmlFor="fontsize">Font size</label>
        <input
          type="text"
          value={fontSize}
          onChange={(e) => dispatch(setFontSize(e.target.value))}
          name="fontsize"
        />
      </div>

      <div>
        <label htmlFor="top">Top position</label>
        <input
          type="text"
          value={topPosition}
          onChange={(e) => dispatch(setTopPosition(e.target.value))}
          name="top"
        />
      </div>

      <div>
        <label htmlFor="left">Left position</label>
        <input
          type="text"
          value={leftPosition}
          onChange={(e) => dispatch(setLeftPosition(e.target.value))}
          name="left"
        />
      </div>

      <div>
        <label htmlFor="font">Font style</label>
        <FontPicker
          apiKey={process.env.REACT_APP_FONT_PICKER_API_KEY}
          activeFontFamily={fontFamily}
          pickerId="font"
          onChange={(nextFont) => dispatch(setFontFamily(nextFont.family))}
        />
      </div>

      <div>
        <button
          type="button"
          onClick={() =>
            downloadWatermarkoImage({
              imageFilename: `watermarko-${name}.${extension}`,
            })
          }
        >
          Download
        </button>
      </div>
    </div>
  );
}

export default Editor;
