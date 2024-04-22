import { useSelector, useDispatch } from "react-redux";
import { downloadWatermarkoImage } from "../helpers/utility";
import { setLicenseKey } from "../redux/licenseSlice";
import "./editor.css";
import Input from "../blocks/input";
import KeyIcon from "../icons/key";

export default function Download() {
  const dispatch = useDispatch();
  const { name, extension } = useSelector((state) => state.image);
  const { licenseKey } = useSelector((state) => state.license);

  return (
    <>
      <div>
        <Input
          label="License key"
          identifier="licensekey"
          value={licenseKey}
          onChange={(e) => dispatch(setLicenseKey(e.target.value))}
          icon={<KeyIcon />}
        />
      </div>

      <div>
        <button
          type="button"
          onClick={() =>
            downloadWatermarkoImage({
              imageFilename: `watermarko-${name}.${extension}`,
              licenseKey,
            })
          }
        >
          Download
        </button>
      </div>
    </>
  );
}
