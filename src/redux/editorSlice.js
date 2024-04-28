import { createSlice } from "@reduxjs/toolkit";

var root = document.documentElement;
var styles = getComputedStyle(root);
var primaryColor = styles.getPropertyValue("--primary");

const initialState = {
  watermarkText: "watermarko",
  color: primaryColor,
  fontSize: 20,
  fontFamily: "Roboto",
  topPosition: 20,
  leftPosition: 20,
  transparency: 100,
};

export const editorSlice = createSlice({
  name: "editorSlice",
  initialState,
  reducers: {
    setWatermarkText: (state, action) => {
      state.watermarkText = action.payload;
    },
    setColor: (state, action) => {
      state.color = action.payload;
    },
    setFontSize: (state, action) => {
      state.fontSize = action.payload;
    },
    setFontFamily: (state, action) => {
      state.fontFamily = action.payload;
    },
    setTopPosition: (state, action) => {
      state.topPosition = action.payload;
    },
    setLeftPosition: (state, action) => {
      state.leftPosition = action.payload;
    },
    setTransparency: (state, action) => {
      state.transparency = action.payload;
    },
  },
});

export const {
  setWatermarkText,
  setColor,
  setFontFamily,
  setFontSize,
  setLeftPosition,
  setTopPosition,
  setTransparency,
} = editorSlice.actions;

export default editorSlice.reducer;
