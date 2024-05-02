import { useSelector, useDispatch } from "react-redux";
import { downloadWatermarkoImage } from "../helpers/utility";
import "./download.css";

export default function Download() {
  const dispatch = useDispatch();
  const { name, extension, watermarkedImageReference } = useSelector((state) => state.image);
  const { licenseKey } = useSelector((state) => state.license);

  return (
    <div className="download">
      <button
        type="button"
        onClick={() =>
          downloadWatermarkoImage(watermarkedImageReference, {
            imageFilename: `watermarko-${name}.${extension}`,
            licenseKey,
          })
        }
      >
        Download
      </button>
    </div>
  );
}
