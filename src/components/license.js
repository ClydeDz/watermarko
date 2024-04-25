import { useSelector, useDispatch } from "react-redux";
import { downloadWatermarkoImage } from "../helpers/utility";
import { setLicenseKey } from "../redux/licenseSlice";
import "./license.css";
import Input, { INPUT_VARIANTS } from "../blocks/input";
import KeyIcon from "../icons/key";
import { useState } from "react";

export default function License() {
  const dispatch = useDispatch();
  const { name, extension } = useSelector((state) => state.image);
  const { licenseKey } = useSelector((state) => state.license);
  const [isSelected, setIsSelected] = useState(false);

  return (
    <div className="license">
      <button onClick={(e) => setIsSelected(!isSelected)}>
        Purchase an upgrade
      </button>
      {isSelected && (
        <div className="popup">
          <Input
            label="License key"
            identifier="licensekey"
            variant={INPUT_VARIANTS.ICON_REGULAR}
            value={licenseKey}
            onChange={(e) => dispatch(setLicenseKey(e.target.value))}
            icon={<KeyIcon />}
          />
          <hr />
          <h2>Where to buy a license?</h2>
          <p>scscscsc</p>
          <button>Buy a license on Gumroad</button>
        </div>
      )}
    </div>
  );
}
