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
  setTransparency,
  setWatermarkText,
} from "../redux/editorSlice";
import { createWatermark } from "../helpers/utility";
import "./toolbar.css";
import Input, { INPUT_VARIANTS } from "../blocks/input";
import ColorPicker from "../blocks/colorPicker";
import TransparencySlider from "../blocks/slider";
import FontSize from "../blocks/fontSize";
import Separator from "../blocks/separator";
import UpDownIcon from "../icons/upDownIcon";
import LeftRightIcon from "../icons/leftRightIcon";
import FileUpload from "../blocks/fileUpload";

const DEBOUNCE_DELAY = 500;

export default function Toolbar() {
  const dispatch = useDispatch();

  const {
    watermarkText,
    color,
    fontSize,
    fontFamily,
    topPosition,
    leftPosition,
    transparency,
  } = useSelector((state) => state.editor);
  const { name, extension } = useSelector((state) => state.image);
  const { licenseKey } = useSelector((state) => state.license);

  const [debouncedWatermarkText] = useDebounce(watermarkText, DEBOUNCE_DELAY);
  const [debouncedColor] = useDebounce(color, DEBOUNCE_DELAY);
  const [debouncedTopPosition] = useDebounce(topPosition, DEBOUNCE_DELAY);
  const [debouncedLeftPosition] = useDebounce(leftPosition, DEBOUNCE_DELAY);
  const [debouncedFontSize] = useDebounce(fontSize, DEBOUNCE_DELAY);
  const [debouncedFontFamily] = useDebounce(fontFamily, DEBOUNCE_DELAY * 3);
  const [debouncedTransparency] = useDebounce(transparency, DEBOUNCE_DELAY);

  useEffect(() => {
    createWatermark({
      activeFontFamily: debouncedFontFamily,
      watermarkText: debouncedWatermarkText,
      color: debouncedColor,
      position: { x: debouncedLeftPosition, y: debouncedTopPosition },
      fontSize: debouncedFontSize,
      transparency: transparency,
    });
  }, [
    debouncedWatermarkText,
    debouncedFontFamily,
    debouncedColor,
    debouncedTopPosition,
    debouncedLeftPosition,
    debouncedFontSize,
    debouncedTransparency,
    name,
  ]);

  return (
    <div className="toolbar">
      <div>
        <Input
          value={watermarkText}
          identifier="watermarkText"
          variant={INPUT_VARIANTS.REGULAR}
          onChange={(e) => dispatch(setWatermarkText(e.target.value))}
        />
        <FontSize
          value={fontSize}
          onFontSizeChange={(value) => dispatch(setFontSize(value))}
        />
        <ColorPicker
          value={color}
          onColorChange={(value) => dispatch(setColor(value))}
        />
        <FontPicker
          apiKey={process.env.REACT_APP_FONT_PICKER_API_KEY}
          activeFontFamily={fontFamily}
          pickerId="font"
          onChange={(nextFont) => dispatch(setFontFamily(nextFont.family))}
        />
        <TransparencySlider
          value={transparency}
          onChange={(value) => dispatch(setTransparency(value))}
        />
        <Input
          value={topPosition}
          identifier="topPosition"
          variant={INPUT_VARIANTS.ICON_COMPACT}
          icon={<UpDownIcon />}
          onChange={(e) => dispatch(setTopPosition(e.target.value))}
        />
        <Input
          value={leftPosition}
          identifier="leftPosition"
          variant={INPUT_VARIANTS.ICON_COMPACT}
          icon={<LeftRightIcon />}
          onChange={(e) => dispatch(setLeftPosition(e.target.value))}
        />
        <FileUpload />
      </div>
    </div>
  );
}
