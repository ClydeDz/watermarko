import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  licenseKey: "",
};

export const licenseSlice = createSlice({
  name: "licenseSlice",
  initialState,
  reducers: {
    setLicenseKey: (state, action) => {
      state.licenseKey = action.payload;
    },
  },
});

export const { setLicenseKey } = licenseSlice.actions;

export default licenseSlice.reducer;
