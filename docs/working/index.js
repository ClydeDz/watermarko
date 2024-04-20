document.addEventListener("DOMContentLoaded", () => {
  document.getElementById('generate').addEventListener('click', () => {
    createWatermark();
  })
});


async function createWatermark() {
  console.log('enfiwenfi')
  const imagesDiv = document.getElementById("images");
  const fileInput = document.getElementById("upload");
  const watermakedImageWithText = document.querySelector("#watermakedImageWithText");
  const watermarkTextInput = document.getElementById("watermarkText").value;
  const originalImage = document.querySelector("#originalImage");

  const [file] = fileInput.files;  

  console.log(file)

  originalImage.src = await fileToDataUri(file); 

  originalImage.addEventListener("load", async () => {
    watermakedImageWithText.src = watermakImageWithText(
      originalImage,
      watermarkTextInput
    );
  });

  imagesDiv.style.visibility = "visible";
}

function watermakImageWithText(originalImage, watermarkText) {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  const canvasWidth = originalImage.width;
  const canvasHeight = originalImage.height;
  
  console.log(originalImage.width, originalImage.height)
  console.log(canvasHeight, canvasWidth)

  canvas.width = canvasWidth;
  canvas.height = canvasHeight;

  context.drawImage(originalImage, 0, 0, canvasWidth, canvasHeight);

  context.fillStyle = "white";
  context.textBaseline = "middle";
  context.font = "bold 40px arial";
  context.fillText(watermarkText, canvasWidth - 300, canvasHeight - 50);

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

