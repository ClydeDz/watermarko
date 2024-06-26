import ColorPickerIcon from "../icons/colorPickerIcon";
import { TwitterPicker } from "react-color";
import { useRef, useState } from "react";

import "./colorPicker.css";
import { useClosePopup } from "../helpers/useClosePopup";

export default function ColorPicker(props) {
  const { value, onColorChange } = props;
  const colorPickerTriggerRef = useRef();
  const colorPickerPopupRef = useRef();
  const [isSelected, setIsSelected] = useState(false);

  useClosePopup(colorPickerTriggerRef, colorPickerPopupRef, setIsSelected);

  return (
    <div className="colorPicker">
      <button
        onClick={() => setIsSelected(!isSelected)}
        ref={colorPickerTriggerRef}
      >
        <ColorPickerIcon fontColor={value} />
      </button>

      {isSelected && (
        <div className="popup" ref={colorPickerPopupRef}>
          <TwitterPicker
            color={value}
            className="twitterPicker"
            triangle="hide"
            onChangeComplete={(color) => {
              onColorChange(color.hex);
              setIsSelected(!isSelected);
            }}
            colors={[
              "#4D4D4D",
              "#999999",
              "#FFFFFF",
              "#F44E3B",
              "#FE9200",
              "#FCDC00",
              "#DBDF00",
              "#A4DD00",
              "#68CCCA",
              "#73D8FF",
              "#AEA1FF",
              "#FDA1FF",
              "#333333",
              "#808080",
              "#cccccc",
              "#D33115",
              "#E27300",
              "#FCC400",
              "#B0BC00",
              "#68BC00",
              "#16A5A5",
              "#009CE0",
              "#7B64FF",
              "#FA28FF",
              "#000000",
              "#666666",
              "#B3B3B3",
              "#9F0500",
              "#C45100",
              "#FB9E00",
              "#808900",
              "#194D33",
              "#0C797D",
              "#0062B1",
              "#653294",
              "#AB149E",
            ]}
          />
        </div>
      )}
    </div>
  );
}
