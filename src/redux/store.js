import { configureStore } from "@reduxjs/toolkit";
import imageReducer from "./imageSlice";
import editorReducer from "./editorSlice";
import licenseReducer from "./licenseSlice";

export const store = configureStore({
  reducer: {
    image: imageReducer,
    editor: editorReducer,
    license: licenseReducer,
  },
});
