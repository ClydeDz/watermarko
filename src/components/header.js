import Download from "./download";
import "./header.css";
import License from "./license";

export default function Header() {
  return (
    <div id="header">
      <h1>Watermarko</h1>
      <div>
        <License />
        <Download />
      </div>
    </div>
  );
}
