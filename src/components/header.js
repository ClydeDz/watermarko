import Download from "./download";
import "./header.css";
import License from "./license";
import Logo from "../icons/Watermarko.svg";

export default function Header() {
  return (
    <div id="header">
      <h1 hidden>Watermarko</h1>
      <img src={Logo} alt="" height={26} />
      <div>
        <License />
        <Download />
      </div>
    </div>
  );
}
