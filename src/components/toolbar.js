import { useSelector, useDispatch } from "react-redux";
import FontPicker from "font-picker-react";
import {
  setColor,
  setFontFamily,
  setFontSize,
  setLeftPosition,
  setTopPosition,
  setTransparency,
  setWatermarkText,
} from "../redux/editorSlice";
import "./toolbar.css";
import Input, { INPUT_VARIANTS } from "../blocks/input";
import ColorPicker from "../blocks/colorPicker";
import TransparencySlider from "../blocks/slider";
import FontSize from "../blocks/fontSize";
import UpDownIcon from "../icons/upDownIcon";
import LeftRightIcon from "../icons/leftRightIcon";
import FileUpload from "../blocks/fileUpload";
import { setHiddenOriginalImageReference } from "../redux/imageSlice";

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
        <FileUpload
          onChange={(reference) =>
            dispatch(setHiddenOriginalImageReference(reference))
          }
        />
      </div>
    </div>
  );
}
