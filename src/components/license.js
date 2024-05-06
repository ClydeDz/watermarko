import { useSelector, useDispatch } from "react-redux";
import { setLicenseKey } from "../redux/licenseSlice";
import "./license.css";
import Input, { INPUT_VARIANTS } from "../blocks/input";
import { useState } from "react";
import NewTabIcon from "../icons/newTabIcon";

export default function License() {
  const dispatch = useDispatch();
  const { licenseKey } = useSelector((state) => state.license);
  const [isSelected, setIsSelected] = useState(false);

  return (
    <div className="license">
      <button onClick={(e) => setIsSelected(!isSelected)}>
        Download full size
      </button>
      {isSelected && (
        <div className="popup">
          <Input
            label="License key"
            identifier="licensekey"
            variant={INPUT_VARIANTS.REGULAR}
            value={licenseKey}
            onChange={(e) => dispatch(setLicenseKey(e.target.value))}
          />
          <hr />
          <h2>Where to buy a license?</h2>
          <p>scscscsc</p>
          <button>
            Buy a license on Gumroad
            <NewTabIcon />
          </button>
        </div>
      )}
    </div>
  );
}
