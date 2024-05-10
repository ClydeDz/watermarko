import { useSelector } from "react-redux";
import "./tooltip.css";
import { formatBytes } from "../helpers/utility";

export const Tooltip = () => {
  const { name, extension, dimensions, size } = useSelector(
    (state) => state.image
  );

  return (
    <div className="tooltip">
      <span>{`${name}.${extension} ${dimensions.width}x${
        dimensions.height
      } ${formatBytes(size, 2)}`}</span>
    </div>
  );
};
