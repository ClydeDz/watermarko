import { useEffect, useState } from 'react';
import './App.css';
import FontPicker from "font-picker-react";
import { useDebounce } from "use-debounce";

const positions = {
	TOP_LEFT: "TOP_LEFT",
	TOP_RIGHT: "TOP_RIGHT",
	BOTTOM_LEFT: "BOTTOM_LEFT",
	BOTTOM_RIGHT: "BOTTOM_RIGHT"
}

async function createWatermark(props) {
  const imagesDiv = document.getElementById("images");
  const fileInput = document.getElementById("upload");
  const watermakedImageWithText = document.querySelector("#watermakedImageWithText");
  const originalImage = document.querySelector("#originalImage");

  const [file] = fileInput.files;
  
  if(!file) return;

  console.log(file)

  originalImage.src = await fileToDataUri(file); 

  originalImage.addEventListener("load", async () => {
    watermakedImageWithText.src = watermakImageWithText(
      originalImage,
      props
    );
  });

  imagesDiv.style.visibility = "visible";
}

function watermakImageWithText(originalImage, props) {
  const {activeFontFamily, watermarkText, color, position, fontSize} = props
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  const canvasWidth = originalImage.width;
  const canvasHeight = originalImage.height;
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;

  context.drawImage(originalImage, 0, 0, canvasWidth, canvasHeight);

  context.fillStyle = color;
  context.textBaseline = "middle";
  context.font = `${fontSize}px ${activeFontFamily}`;
  context.fillText(watermarkText, position.x, position.y);

  return canvas.toDataURL();
}


async function download() {
  const originalImage = document.querySelector("#originalImage");
  const watermakedImageWithText = document.querySelector("#watermakedImageWithText");
  const image = await fetch(watermakedImageWithText.src)
  const imageBlog = await image.blob()
  const imageURL = URL.createObjectURL(imageBlog)

  const link = document.createElement('a')
  link.href = imageURL
  link.download = 'watermarko.png'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}


function fileToDataUri(field) {
  return new Promise((resolve) => {
    const reader = new FileReader();

    reader.addEventListener("load", () => {
      resolve(reader.result);
    });

    reader.readAsDataURL(field);
  });
}


function App() {  
  const [watermarkText, setWatermarkText] = useState('Watermarko')
  const [debouncedWatermarkText] = useDebounce(watermarkText, 500);
  const [color, setColor] = useState('#FFFFFF')
  const [debouncedColor] = useDebounce(color, 500);
  const [activeFontFamily, setActiveFontFamily] = useState('Roboto')
  const [topPosition, setTopPosition] = useState(20)
  const [debouncedTopPosition] = useDebounce(topPosition, 500);
  const [leftPosition, setLeftPosition] = useState(0)
  const [debouncedLeftPosition] = useDebounce(leftPosition, 500);
  const [fontSize, setFontSize] = useState(20)
  const [debouncedFontSize] = useDebounce(fontSize, 500);

  useEffect(() => {
    createWatermark({
      activeFontFamily, 
      watermarkText: debouncedWatermarkText, 
      color: debouncedColor,
      position: {x: debouncedLeftPosition, y: debouncedTopPosition},
      fontSize: debouncedFontSize
    })
  }, [debouncedWatermarkText, activeFontFamily, debouncedColor, debouncedTopPosition, debouncedLeftPosition, debouncedFontSize])

  return (
    <div className='container'>
    <div id='editor' className='row'>
      <div>
        <label for="watermarkText">Watermark text</label>
        <input type="text" value={watermarkText} id="watermarkText" onChange={e => setWatermarkText(e.target.value)} />
      </div>
      
      <div>
        <label for="color">Watermark color</label>
        <input type='color' value={color} onChange={e => setColor(e.target.value)} name='color'/>
      </div>
      
      <div>
      <label for="fontsize">Font size</label>
      <input type="text" value={fontSize} onChange={e => setFontSize(e.target.value)} name='fontsize'/>
      </div>

      <div>
      <label for="top">Top position</label>
      <input type="text" value={topPosition} onChange={e => setTopPosition(e.target.value)} name='top'/>
      </div>
      
      <div>
      <label for="left">Left position</label>
      <input type="text" value={leftPosition} onChange={e => setLeftPosition(e.target.value)} name='left'/>  
      </div>

      <div>
      <label for="font">Font style</label>
      <FontPicker
        apiKey="AIzaSyAiWXiHsvjd7BO-U7cI3c_bn6x__yK1FfY"
        activeFontFamily={activeFontFamily}
        pickerId='font'
        onChange={(nextFont) =>
          setActiveFontFamily(nextFont.family)
        }        
      />
      </div>
      
      <div>
      <button type="button" onClick={download()}>Download</button>
      </div>
    
      {/* <select name="cars" id="cars" onChange={e => setPosition(e.target.value)} value={position}>        
        <option value={positions.BOTTOM_LEFT}>{positions.BOTTOM_LEFT}</option>
        <option value={positions.BOTTOM_RIGHT}>{positions.BOTTOM_RIGHT}</option>
        <option value={positions.TOP_LEFT}>{positions.TOP_LEFT}</option>
        <option value={positions.TOP_RIGHT}>{positions.TOP_RIGHT}</option>
      </select> */}
      {/* <button id="generate" onClick={() => createWatermark(activeFontFamily)}>Generate preview</button> */}            
				{/* <p className="apply-font">The font will be applied to this text.</p>
        <h1 style={{fontFamily: activeFontFamily}}>huivhehvw heivwiou h</h1>         */}
    </div>
    <div id='previewZone' className='row'>      
      <input id="upload" type="file" accept="image/*" />
      <div id="images" style={{visibility: 'hidden'}}>      
        <img id="watermakedImageWithText"/>
      </div> 
      <img id="originalImage" style={{display: 'none'}} />
      <a id="download" style={{display: 'none'}} ></a>
    </div>
    </div>    
  );
}

export default App;
