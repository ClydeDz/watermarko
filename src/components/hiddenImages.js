import Moveable from "react-moveable";
import * as React from "react";

function HiddenImages() {
  const [xyz, setxyz] = React.useState("aaa");

  return (
    <>
      <div id="images" style={{ visibility: "hidden" }}>
        <div className="target">
          <input
            type="text"
            value={xyz}
            onChange={(e) => setxyz(e.target.value)}
          />
        </div>

        <Moveable
          target={".target"}
          draggable={true}
          scalable={true}
          warpable={true}
          checkInput={true}
          dragContainer={".targetbob"}
          renderDirections={true}
          // onScaleStart={(e) => {
          //   e.setMinScaleSize([100, 100]);
          //   e.setMaxScaleSize([500, 500]);
          // }}
          onRender={(e) => {
            console.log(e);
            e.target.style.cssText += e.cssText;
          }}
        />
        <img id="watermakedImageWithText" className="targetbob" />
      </div>

      <img id="originalImage" style={{ display: "none" }} />
      <a id="download" style={{ display: "none" }}></a>
    </>
  );
}

export default HiddenImages;
