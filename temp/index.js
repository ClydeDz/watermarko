var imagesDiv,  fileInput;

document.addEventListener("DOMContentLoaded", () => {
  // hiding the div that will contain the images
  imagesDiv = document.getElementById("images");
  console.log('123')
  fileInput = document.getElementById("upload");
  fileInput.addEventListener("change", async (e) => {
    console.log('hefheiufheihfi')
    const [file] = fileInput.files;
  
    // displaying the uploaded image
    const originalImage = document.querySelector("#originalImage");
    originalImage.src = await fileToDataUri(file);
  
    // adding the image watermark to the original image
    // and showing the watermarked image
    // const watermakedImage = document.querySelector("#watermakedImage");
    // const watermakedImageWithText = document.querySelector(
    //   "#watermakedImageWithText"
    // );
  
    originalImage.addEventListener("load", async () => {
      // watermakedImage.src = await watermakImage(
      //   originalImage,
      //   "./src/IMG.LY.jpg"
      // );
      watermakedImageWithText.src = watermakImageWithText(
        originalImage,
        "IMG.LY"
      );
    });
  
    // making the div containing the image visible
    imagesDiv.style.visibility = "visible";
  
    return false;
  });  
});



function fileToDataUri(field) {
  return new Promise((resolve) => {
    const reader = new FileReader();

    reader.addEventListener("load", () => {
      resolve(reader.result);
    });

    reader.readAsDataURL(field);
  });
}

// async function watermakImage(originalImage, watermarkImagePath) {
//   const canvas = document.createElement("canvas");
//   const context = canvas.getContext("2d");

//   const canvasWidth = originalImage.width;
//   const canvasHeight = originalImage.height;

//   canvas.width = canvasWidth;
//   canvas.height = canvasHeight;

//   // initializing the canvas with the original image
//   context.drawImage(originalImage, 0, 0, canvasWidth, canvasHeight);

//   // loading the watermark image and transforming it into a pattern
//   //const result = await fetch(watermarkImagePath);
//   //const blob = await result.blob();
//   //const image = await createImageBitmap(blob);
//   const pattern = context.createPattern('image', "no-repeat");
//   // translating the watermark image to the bottom right corner
//   context.translate(canvasWidth - image.width, canvasHeight - image.height);
//   context.rect(0, 0, canvasWidth, canvasHeight);
//   context.fillStyle = pattern;

//   context.fill();

//   return canvas.toDataURL();
// }

function watermakImageWithText(originalImage, watermarkText) {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  const canvasWidth = originalImage.width;
  const canvasHeight = originalImage.height;

  canvas.width = canvasWidth;
  canvas.height = canvasHeight;

  // initializing the canvas with the original image
  context.drawImage(originalImage, 0, 0, canvasWidth, canvasHeight);

  // adding a blue watermark text in the bottom right corner
  context.fillStyle = "white";
  context.textBaseline = "middle";
  context.font = "bold 40px arial";
  context.fillText(watermarkText, canvasWidth - 300, canvasHeight - 50);

  return canvas.toDataURL();
}
