import { IMAGE_MODE } from "./constant";
import { checkLicense } from "./license";

const applyTextWatermarkToImage = (originalImage, imageMode, props) => {
  const { watermarkText, fontSize, fontFamily, color, transparency, position } =
    props;

  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  canvas.width = originalImage.width / imageMode;
  canvas.height = originalImage.height / imageMode;

  context.drawImage(
    originalImage,
    0,
    0,
    originalImage.width / imageMode,
    originalImage.height / imageMode
  );

  context.globalAlpha = transparency / 100;
  context.fillStyle = color;
  context.textBaseline = "middle";
  context.font = `${fontSize / imageMode}px ${fontFamily}`;
  context.fillText(
    watermarkText,
    position.x / imageMode,
    position.y / imageMode
  );

  return canvas.toDataURL();
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

export const downloadWatermarkImage = async (originalImage, props) => {
  const { imageFilename, imageFileExtension, licenseKey } = props;

  const isValid = await checkLicense(licenseKey);

  let image;
  let sizeBasedFilenameIdentifier = "";

  if (isValid) {
    image = await fetch(
      applyTextWatermarkToImage(originalImage, IMAGE_MODE.FULL, props)
    );
  } else {
    image = await fetch(
      applyTextWatermarkToImage(originalImage, IMAGE_MODE.HALF, props)
    );
    sizeBasedFilenameIdentifier = "-half-size";
  }

  const imageBlog = await image.blob();
  const imageURL = URL.createObjectURL(imageBlog);

  const link = document.createElement("a");
  link.href = imageURL;
  link.download = `watermarko-${imageFilename}${sizeBasedFilenameIdentifier}.${imageFileExtension}`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
