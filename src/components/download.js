import { useSelector } from "react-redux";
import { downloadWatermarkImage } from "../helpers/watermark";
import "./download.css";

export default function Download() {
  const {
    watermarkText,
    fontSize,
    color,
    fontFamily,
    transparency,
    topPosition,
    leftPosition,
  } = useSelector((state) => state.editor);
  const { name, extension, size, hiddenOriginalImageReference } = useSelector(
    (state) => state.image
  );
  const { licenseKey } = useSelector((state) => state.license);

  const onDownloadBtnClick = () => {
    if (!hiddenOriginalImageReference) return;

    downloadWatermarkImage(hiddenOriginalImageReference, {
      imageFilename: name,
      imageFileExtension: extension,
      licenseKey,
      watermarkText,
      fontSize,
      color,
      fontFamily,
      transparency,
      position: { x: leftPosition, y: topPosition },
    });
  };

  return (
    <div className="download">
      <button type="button" onClick={onDownloadBtnClick} disabled={size <= 0}>
        Download
      </button>
    </div>
  );
}
