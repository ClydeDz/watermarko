import "./fileUpload.css";
import {
  setFilename,
  setFileExtension,
  setFileSize,
  setFileType,
  setFileDimensions,
} from "../redux/imageSlice";
import { useDispatch, useSelector } from "react-redux";
import { fileToDataUri } from "../helpers/utility";
import { useRef } from "react";

export default function FileUpload(props) {
  const { onChange } = props;
  const dispatch = useDispatch();
  const hiddenOriginalImageRef = useRef();
  const { size } = useSelector((state) => state.image);

  const onFileUpload = async (e) => {
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

    hiddenOriginalImageRef.current.src = await fileToDataUri(file);

    onChange(hiddenOriginalImageRef.current);
  };

  const onImageLoad = () => {
    console.log(
      hiddenOriginalImageRef.current.width,
      hiddenOriginalImageRef.current.height
    );
    dispatch(
      setFileDimensions({
        height: hiddenOriginalImageRef.current.height,
        width: hiddenOriginalImageRef.current.width,
      })
    );
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
      <img hidden ref={hiddenOriginalImageRef} onLoad={onImageLoad} />
      <img id="originalImage" hidden />
    </div>
  );
}
