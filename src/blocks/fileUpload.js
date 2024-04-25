import "./fileUpload.css";
import {
  setFilename,
  setFileExtension,
  setFileSize,
} from "../redux/imageSlice";
import { useDispatch } from "react-redux";

export default function FileUpload() {
  const dispatch = useDispatch();

  const onFileUpload = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const { name } = file;
    const fileName = name.substr(0, name.lastIndexOf("."));
    const fileExtension = name.substr(name.lastIndexOf(".") + 1);
    const fileSize = file.size;

    console.log(fileName, fileExtension, fileSize);

    dispatch(setFilename(fileName));
    dispatch(setFileExtension(fileExtension));
    dispatch(setFileSize(fileSize));
  };

  return (
    <div className="file-upload">
      <input
        type="file"
        id="fileUpload"
        accept="image/*"
        hidden
        onChange={(e) => onFileUpload(e)}
      />
      <label for="fileUpload">Upload an image</label>
    </div>
  );
}
