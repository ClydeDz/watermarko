import Preview from "./components/preview";
import Header from "./components/header";
import Toolbar from "./components/toolbar";
import { ResponsiveBanner } from "./components/ResponsiveBanner";

function Watermarko() {
  return (
    <>
      <Header />
      <Toolbar />
      <ResponsiveBanner />
      <Preview />
    </>
  );
}

export default Watermarko;
