export const fileToDataUri = (field) => {
  return new Promise((resolve) => {
    const reader = new FileReader();

    reader.addEventListener("load", () => {
      resolve(reader.result);
    });

    reader.readAsDataURL(field);
  });
};

export const createWatermark = async (props) => {
  const fileInput = document.getElementById("fileUpload");
  const watermakedImageWithText = document.querySelector(
    "#watermakedImageWithText"
  );
  const originalImage = document.querySelector("#originalImage");

  const [file] = fileInput.files;

  if (!file) return;

  originalImage.src = await fileToDataUri(file);

  originalImage.addEventListener("load", async () => {
    watermakedImageWithText.src = watermakImageWithText(originalImage, props);
  });
};

export const watermakImageWithText = (originalImage, props) => {
  const {
    activeFontFamily,
    watermarkText,
    color,
    position,
    fontSize,
    transparency,
  } = props;

  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  const canvasWidth = originalImage.width;
  const canvasHeight = originalImage.height;
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;

  context.drawImage(originalImage, 0, 0, canvasWidth, canvasHeight);

  context.globalAlpha = transparency / 100;
  context.fillStyle = color;
  context.textBaseline = "middle";
  context.font = `${fontSize}px ${activeFontFamily}`;
  context.fillText(watermarkText, position.x, position.y);

  return canvas.toDataURL();
};

export const checkLicense = async (licenseKey) => {
  const rawResponse = await fetch(
    "https://api.gumroad.com/v2/licenses/verify",
    {
      method: "POST",
      body: JSON.stringify({
        product_id: process.env.REACT_APP_PRODUCT_ID,
        license_key: licenseKey,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  ).catch((error) => console.error(error));

  const content = await rawResponse.json();
  return content.success;
};

export const downloadWatermarkoImage = async (props) => {
  const { imageFilename, licenseKey } = props;

  const isValid = await checkLicense(licenseKey);
  console.log(isValid);

  const watermakedImageWithText = document.querySelector(
    "#watermakedImageWithText"
  );
  const image = await fetch(watermakedImageWithText.src);
  const imageBlog = await image.blob();
  const imageURL = URL.createObjectURL(imageBlog);

  const link = document.createElement("a");
  link.href = imageURL;
  link.download = imageFilename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
