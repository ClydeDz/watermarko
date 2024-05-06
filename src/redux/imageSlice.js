import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "watermarko",
  extension: "png",
  size: 0,
  type: "",
  dimensions: { height: 0, width: 0 },
  hiddenOriginalImageReference: null,
  previewImageReference: null,
};

export const imageSlice = createSlice({
  name: "imageSlice",
  initialState,
  reducers: {
    setFilename: (state, action) => {
      state.name = action.payload;
    },
    setFileExtension: (state, action) => {
      state.extension = action.payload;
    },
    setFileSize: (state, action) => {
      state.size = action.payload;
    },
    setFileType: (state, action) => {
      state.type = action.payload;
    },
    setFileDimensions: (state, action) => {
      state.dimensions = action.payload;
    },
    setHiddenOriginalImageReference: (state, action) => {
      state.hiddenOriginalImageReference = action.payload;
    },
    setPreviewImageRef: (state, action) => {
      state.previewImageReference = action.payload;
    },
  },
});

export const {
  setFilename,
  setFileExtension,
  setFileSize,
  setFileType,
  setFileDimensions,
  setHiddenOriginalImageReference,
  setPreviewImageRef,
} = imageSlice.actions;

export default imageSlice.reducer;
