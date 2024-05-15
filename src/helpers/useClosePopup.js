import { useEffect } from "react";

export const useClosePopup = (triggerRef, popupRef, closePopup) => {
  const closeDropdownOnClick = (e) => {
    const isTriggerClicked = triggerRef.current?.contains(e.target);
    const isPopupClicked = popupRef.current?.contains(e.target);

    !isTriggerClicked && !isPopupClicked && closePopup(false);
  };

  const closeDropdownOnEscape = (e) => {
    if (e.key !== "Escape") return;

    closePopup(false);
  };

  useEffect(() => {
    document.addEventListener("click", closeDropdownOnClick);
    document.addEventListener("keydown", closeDropdownOnEscape);

    return () => {
      document.removeEventListener("click", closeDropdownOnClick);
      document.removeEventListener("keydown", closeDropdownOnEscape);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
