import { useSelector, useDispatch } from "react-redux";
import { setIsLicenseValid, setLicenseKey } from "../redux/licenseSlice";
import "./license.css";
import Input, { INPUT_VARIANTS } from "../blocks/input";
import { useEffect, useRef, useState } from "react";
import { useDebounce } from "use-debounce";
import { DEBOUNCE_DELAY } from "../helpers/constant";
import { checkLicense } from "../helpers/license";
import { useClosePopup } from "../helpers/useClosePopup";

export default function License() {
  const dispatch = useDispatch();
  const licenseTriggerRef = useRef();
  const licensePopupRef = useRef();
  const { licenseKey, isLicenseValid } = useSelector((state) => state.license);
  const [isSelected, setIsSelected] = useState(false);
  const [debouncedLicenseKey] = useDebounce(licenseKey, DEBOUNCE_DELAY);

  useClosePopup(licenseTriggerRef, licensePopupRef, setIsSelected);

  const checkIsLicenseValid = async () => {
    const isValid =
      debouncedLicenseKey.length < 5
        ? false
        : await checkLicense(debouncedLicenseKey);
    dispatch(setIsLicenseValid(isValid));
  };

  useEffect(() => {
    checkIsLicenseValid();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedLicenseKey]);

  const openLinkInNewTab = (url) => {
    const newTab = window.open(url, "_blank", "noopener,noreferrer");
    if (newTab) newTab.opener = null;
  };

  return (
    <div className="license">
      <button
        onClick={(e) => setIsSelected(!isSelected)}
        ref={licenseTriggerRef}
      >
        {isLicenseValid
          ? "Thanks for purchasing the license"
          : "Download full size"}
      </button>
      {isSelected && (
        <div className="popup" ref={licensePopupRef}>
          <Input
            label={`License key ${isLicenseValid ? "(valid)" : ""}`}
            identifier="licensekey"
            variant={INPUT_VARIANTS.REGULAR}
            value={licenseKey}
            onChange={(e) => dispatch(setLicenseKey(e.target.value))}
          />
          {!isLicenseValid && (
            <>
              <hr />
              <h2>Where to buy a license?</h2>
              <p>
                You can purchase a perpetual license from Gumroad. Click the
                button below and make the purchase to get your license key. Come
                back here and insert the key above to validate it.
              </p>
              <button
                onClick={() =>
                  openLinkInNewTab(
                    "https://clydedsouza.gumroad.com/l/watermarko"
                  )
                }
              >
                Buy a license on Gumroad
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
