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
import { useRef, useState } from "react";

export default function FileUpload(props) {
  const { onChange } = props;
  const dispatch = useDispatch();
  const hiddenOriginalImageRef = useRef();
  const [uploadedImage, setUploadedImage] = useState(undefined);
  const { size } = useSelector((state) => state.image);

  const onFileUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setUploadedImage(file);
    hiddenOriginalImageRef.current.src = await fileToDataUri(file);
  };

  const onImageLoad = () => {
    dispatch(
      setFileDimensions({
        height: hiddenOriginalImageRef.current.height,
        width: hiddenOriginalImageRef.current.width,
      })
    );

    const { name, size: fileSize, type: fileType } = uploadedImage;
    const fileName = name.substr(0, name.lastIndexOf("."));
    const fileExtension = name.substr(name.lastIndexOf(".") + 1);

    dispatch(setFilename(fileName));
    dispatch(setFileExtension(fileExtension));
    dispatch(setFileSize(fileSize));
    dispatch(setFileType(fileType));

    onChange(hiddenOriginalImageRef.current);
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
      <label htmlFor="fileUpload">
        {size > 0 ? "Upload another image" : "Upload an image"}
      </label>
      <img
        hidden
        ref={hiddenOriginalImageRef}
        onLoad={onImageLoad}
        alt="Hidden original"
      />
    </div>
  );
}
