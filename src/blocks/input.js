import "./input.css";

export const INPUT_VARIANTS = {
  REGULAR: "REGULAR",
  ICON_REGULAR: "ICON_REGULAR",
  COMPACT: "COMPACT",
  ICON_COMPACT: "ICON_COMPACT",
};

const VARIANT_CSS_CLASSNAMES = {
  [INPUT_VARIANTS.REGULAR]: "textinput",
  [INPUT_VARIANTS.ICON_REGULAR]: "textinput with-icon",
  [INPUT_VARIANTS.COMPACT]: "textinput compact",
  [INPUT_VARIANTS.ICON_COMPACT]: "textinput compact with-icon",
};

export default function Input(props) {
  const { label, identifier, onChange, icon, value, variant } = props;
  return (
    <div className="textinput-container">
      {label && <label htmlFor={identifier}>{label}</label>}
      {icon && icon}
      <input
        type="text"
        value={value}
        className={VARIANT_CSS_CLASSNAMES[variant]}
        onChange={onChange}
        name={identifier}
      />
    </div>
  );
}
