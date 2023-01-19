const isBase64 = require("is-base64");

export const isValidImageFormat = (image: string | undefined): boolean => {
  return isBase64(image, {
    mimeRequired: true,
    allowEmpty: false,
  });
};
