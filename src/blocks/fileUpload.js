import "./fileUpload.css";
import {
  setFilename,
  setFileExtension,
  setFileSize,
  setFileType,
} from "../redux/imageSlice";
import { useDispatch, useSelector } from "react-redux";

export default function FileUpload() {
  const dispatch = useDispatch();
  const { size } = useSelector((state) => state.image);

  const onFileUpload = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const { name, size: fileSize, type: fileType } = file;
    const fileName = name.substr(0, name.lastIndexOf("."));
    const fileExtension = name.substr(name.lastIndexOf(".") + 1);

    console.log(fileName, fileExtension, fileSize);

    dispatch(setFilename(fileName));
    dispatch(setFileExtension(fileExtension));
    dispatch(setFileSize(fileSize));
    dispatch(setFileType(fileType));
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
      <label for="fileUpload">
        {size > 0 ? "Upload another image" : "Upload an image"}
      </label>
    </div>
  );
}
