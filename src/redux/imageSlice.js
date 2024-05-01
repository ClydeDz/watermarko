import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "watermarko",
  extension: "png",
  size: 0,
  type: "",
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
  },
});

export const { setFilename, setFileExtension, setFileSize, setFileType } =
  imageSlice.actions;

export default imageSlice.reducer;
