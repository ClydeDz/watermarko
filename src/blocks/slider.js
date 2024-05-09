import { useEffect, useRef, useState } from "react";
import "./slider.css";
import Input, { INPUT_VARIANTS } from "./input";
import OpacityIcon from "../icons/opacity";

export default function TransparencySlider(props) {
  const { value, onChange } = props;
  const transparencyTriggerRef = useRef();
  const transparencyPopupRef = useRef();
  const [isSelected, setIsSelected] = useState(false);

  const closeDropdown = (e) => {
    const isTriggerClicked = transparencyTriggerRef.current?.contains(e.target);
    const isPopupClicked = transparencyPopupRef.current?.contains(e.target);

    !isTriggerClicked && !isPopupClicked && setIsSelected(false);
  };

  const closeDropdownOnEscape = (e) => {
    if (e.key !== "Escape") return;

    setIsSelected(false);
  };

  useEffect(() => {
    document.addEventListener("click", closeDropdown);
    document.addEventListener("keydown", closeDropdownOnEscape);
    return () => {
      document.removeEventListener("click", closeDropdown);
      document.removeEventListener("keydown", closeDropdownOnEscape);
    };
  }, []);

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
