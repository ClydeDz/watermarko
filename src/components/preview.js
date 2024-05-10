import "./preview.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { useDebounce } from "use-debounce";

import { generateWatermarkPreview } from "../helpers/watermark";
import { setPreviewImageRef } from "../redux/imageSlice";
import { DEBOUNCE_DELAY } from "../helpers/constant";
import { Tooltip } from "./tooltip";

export default function Preview() {
  const previewImageRef = useRef();
  const dispatch = useDispatch();
  const [isSelected, setIsSelected] = useState(false);

  const {
    watermarkText,
    fontSize,
    color,
    fontFamily,
    transparency,
    topPosition,
    leftPosition,
  } = useSelector((state) => state.editor);
  const { name, hiddenOriginalImageReference } = useSelector(
    (state) => state.image
  );

  const [debouncedWatermarkText] = useDebounce(watermarkText, DEBOUNCE_DELAY);
  const [debouncedFontSize] = useDebounce(fontSize, DEBOUNCE_DELAY);
  const [debouncedColor] = useDebounce(color, DEBOUNCE_DELAY);
  const [debouncedFontFamily] = useDebounce(fontFamily, DEBOUNCE_DELAY * 1.5);
  const [debouncedTransparency] = useDebounce(transparency, DEBOUNCE_DELAY);
  const [debouncedTopPosition] = useDebounce(topPosition, DEBOUNCE_DELAY);
  const [debouncedLeftPosition] = useDebounce(leftPosition, DEBOUNCE_DELAY);

  useEffect(() => {
    if (!hiddenOriginalImageReference) return;

    generateWatermarkPreview(hiddenOriginalImageReference, previewImageRef, {
      watermarkText: debouncedWatermarkText,
      fontSize: debouncedFontSize,
      color: debouncedColor,
      activeFontFamily: debouncedFontFamily,
      transparency: transparency,
      position: { x: debouncedLeftPosition, y: debouncedTopPosition },
    });
  }, [
    debouncedWatermarkText,
    debouncedFontSize,
    debouncedColor,
    debouncedFontFamily,
    debouncedTransparency,
    debouncedTopPosition,
    debouncedLeftPosition,
    name,
    hiddenOriginalImageReference,
  ]);

  useEffect(() => {
    dispatch(setPreviewImageRef(previewImageRef));
  }, []);

  const onImageClick = () => {
    setIsSelected(!isSelected);
  };

  return (
    <div className="preview">
      <img ref={previewImageRef} onClick={onImageClick} />
      {isSelected && <Tooltip />}
    </div>
  );
}
