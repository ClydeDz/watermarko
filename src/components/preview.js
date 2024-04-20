import {
  setFilename,
  setFileExtension,
  setFileSize,
} from "../redux/imageSlice";
import { useSelector, useDispatch } from "react-redux";
import HiddenImages from "./hiddenImages";

function Preview() {
  const dispatch = useDispatch();
  const image = useSelector((state) => state.image);

  const onFileUpload = (e) => {
    console.log(image);

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
    <div id="previewZone" className="row">
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
