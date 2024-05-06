export const fileToDataUri = (field) => {
  return new Promise((resolve) => {
    const reader = new FileReader();

    reader.addEventListener("load", () => {
      resolve(reader.result);
    });

    reader.readAsDataURL(field);
  });
};

export const generateWatermarkPreview = (
  originalImage,
  watermarkedImage,
  props
) => {
  watermarkedImage.current.src = applyTextWatermarkToImage(
    originalImage,
    IMAGE_MODE.HALF,
    props
  );
};

export const IMAGE_MODE = {
  FULL: "1",
  HALF: "2",
};

const applyTextWatermarkToImage = (originalImage, imageMode, props) => {
  const {
    watermarkText,
    fontSize,
    activeFontFamily,
    color,
    transparency,
    position,
  } = props;

  const canvasWidth = originalImage.width;
  const canvasHeight = originalImage.height;

  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  canvas.width = canvasWidth / imageMode;
  canvas.height = canvasHeight / imageMode;

  context.drawImage(
    originalImage,
    0,
    0,
    canvasWidth / imageMode,
    canvasHeight / imageMode
  );

  context.globalAlpha = transparency / 100;
  context.fillStyle = color;
  context.textBaseline = "middle";
  context.font = `${fontSize / imageMode}px ${activeFontFamily}`;
  context.fillText(
    watermarkText,
    position.x / imageMode,
    position.y / imageMode
  );

  return canvas.toDataURL();
};

export const downloadWatermarkoImage = async (originalImage, props) => {
  const { imageFilename, licenseKey } = props;

  const isValid = true; // await checkLicense(licenseKey);
  // console.log(isValid);

  let image;

  if (isValid) {
    image = await fetch(
      applyTextWatermarkToImage(originalImage, IMAGE_MODE.FULL, props)
    );
  } else {
    image = await fetch(
      applyTextWatermarkToImage(originalImage, IMAGE_MODE.HALF, props)
    );
  }

  const imageBlog = await image.blob();
  const imageURL = URL.createObjectURL(imageBlog);

  const link = document.createElement("a");
  link.href = imageURL;
  link.download = imageFilename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
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
