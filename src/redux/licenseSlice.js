import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  licenseKey: "",
  isLicenseValid: false,
};

export const licenseSlice = createSlice({
  name: "licenseSlice",
  initialState,
  reducers: {
    setLicenseKey: (state, action) => {
      state.licenseKey = action.payload;
    },
    setIsLicenseValid: (state, action) => {
      state.isLicenseValid = action.payload;
    },
  },
});

export const { setLicenseKey, setIsLicenseValid } = licenseSlice.actions;

export default licenseSlice.reducer;
