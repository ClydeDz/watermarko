import { useRef, useState } from "react";
import "./slider.css";
import Input, { INPUT_VARIANTS } from "./input";
import OpacityIcon from "../icons/opacity";
import { useClosePopup } from "../helpers/useClosePopup";

export default function TransparencySlider(props) {
  const { value, onChange } = props;
  const transparencyTriggerRef = useRef();
  const transparencyPopupRef = useRef();
  const [isSelected, setIsSelected] = useState(false);

  useClosePopup(transparencyTriggerRef, transparencyPopupRef, setIsSelected);

  return (
    <div className="slider">
      <button
        onClick={() => setIsSelected(!isSelected)}
        ref={transparencyTriggerRef}
      >
        <OpacityIcon />
      </button>
      {isSelected && (
        <div className="popup" ref={transparencyPopupRef}>
          <div>
            <Input
              value={value}
              identifier="transparency"
              label="Transparency"
              variant={INPUT_VARIANTS.COMPACT}
              onChange={(e) => onChange(e.target.value)}
            />
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onMouseUp={() => setIsSelected(!isSelected)}
          />
        </div>
      )}
    </div>
  );
}
