import { useSelector } from "react-redux";
import { downloadWatermarkoImage } from "../helpers/utility";
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
  const { name, extension, hiddenOriginalImageReference } = useSelector(
    (state) => state.image
  );
  const { licenseKey } = useSelector((state) => state.license);

  const onDownloadBtnClick = () => {
    downloadWatermarkoImage(hiddenOriginalImageReference, {
      imageFilename: `watermarko-${name}.${extension}`,
      licenseKey,
      watermarkText,
      fontSize,
      color,
      activeFontFamily: fontFamily,
      transparency,
      position: { x: leftPosition, y: topPosition },
    });
  };

  return (
    <div className="download">
      <button type="button" onClick={onDownloadBtnClick}>
        Download
      </button>
    </div>
  );
}
