import {
  setFilename,
  setFileExtension,
  setFileSize,
} from "../redux/imageSlice";
import { useDispatch } from "react-redux";
import HiddenImages from "./hiddenImages";
import "./preview.css";

function Preview() {
  const dispatch = useDispatch();

  const onFileUpload = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const { name } = file;
    const fileName = name.substr(0, name.lastIndexOf("."));
    const fileExtension = name.substr(name.lastIndexOf(".") + 1); // name.split(".").pop();
    const fileSize = file.size;

    dispatch(setFilename(fileName));
    dispatch(setFileExtension(fileExtension));
    dispatch(setFileSize(fileSize));
  };

  return (
    <div id="previewZone" className="preview">
      <input
        id="upload"
        type="file"
        accept="image/*"
        onChange={(e) => onFileUpload(e)}
      />
      <HiddenImages />
    </div>
  );
}

export default Preview;
