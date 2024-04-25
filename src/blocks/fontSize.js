import Input, { INPUT_VARIANTS } from "./input";
import "./fontSize.css";
import PlusIcon from "../icons/plusIcon";
import MinusIcon from "../icons/minusIcon";

export default function FontSize(props) {
  const { value, onFontSizeChange } = props;

  return (
    <div className="fontSize">
      <button onClick={() => onFontSizeChange(parseInt(value) - 1)}>
        <MinusIcon />
      </button>
      <Input
        value={value}
        onChange={(e) => onFontSizeChange(e.target.value)}
        identifier="fontsize"
        variant={INPUT_VARIANTS.COMPACT}
      />
      <button onClick={() => onFontSizeChange(parseInt(value) + 1)}>
        <PlusIcon />
      </button>
    </div>
  );
}
