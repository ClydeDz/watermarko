import "./input.css"

export default function Input(props) {
  const { label, identifier, onChange, icon, value } = props;
  return (
    <>
      <label htmlFor={identifier}>{label}</label>
      {icon}
      <input
        type="text"
        value={value}
        className="textinput"
        onChange={onChange}
        name={identifier}
      />
    </>
  );
}
