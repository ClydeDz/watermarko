import { useState } from "react";
import "./slider.css";
import Input, { INPUT_VARIANTS } from "./input";
import OpacityIcon from "../icons/opacity";

export default function TransparencySlider(props) {
  const { value, onChange } = props;
  const [isSelected, setIsSelected] = useState(false);

  return (
    <div className="slider">
      <button onClick={() => setIsSelected(!isSelected)}>
        <OpacityIcon />
      </button>
      {isSelected && (
        <div className="popup">
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
          />
        </div>
      )}
    </div>
  );
}
