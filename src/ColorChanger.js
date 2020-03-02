import tinycolor from "tinycolor2";

const lightRGB = new Array(255, 255, 255);
const darkRGB = new Array(0, 0, 0);

const createSwatches = function(_nHex) {
  let nHex = _nHex.replace("#", "");
  let baseColor = longHexToDec(nHex);
  const colorValues = [];
  const collection = [];
  const opArray = new Array(0.1, 0.2, 0.4, 0.6, 0.8, 1.0, 0.75, 0.5, 0.25, 0.1);
  const labelArray = [
    "50",
    "100",
    "200",
    "300",
    "400",
    "500",
    "600",
    "700",
    "800",
    "900"
  ];
  for (let i = 0; i < 10; i++) {
    let nMask = i <= 5 ? lightRGB : darkRGB;
    let nColor = setColorHue(baseColor, opArray[i], nMask);
    nHex = toHex(nColor[0]) + toHex(nColor[1]) + toHex(nColor[2]);
    colorValues[i] = new Array();
    colorValues[i][0] = nHex;
    colorValues[i][1] = nColor;
    collection[i] = {
      label: labelArray[i],
      color: "#" + nHex,
      rgbColor: tinycolor("#" + nHex).toRgb()
    };
  }
  return collection;
};

function setColorHue(originColor, opacityPercent, maskRGB) {
  const returnColor = new Array();
  for (let w = 0; w < originColor.length; w++)
    returnColor[w] =
      Math.round(originColor[w] * opacityPercent) +
      Math.round(maskRGB[w] * (1.0 - opacityPercent));
  return returnColor;
}
function longHexToDec(longHex) {
  const r = toDec(longHex.substring(0, 2));
  const g = toDec(longHex.substring(2, 4));
  const b = toDec(longHex.substring(4, 6));
  return new Array(r, g, b);
}
function toHex(dec) {
  let hex = dec.toString(16);
  if (hex.length == 1) hex = "0" + hex;
  if (hex == 100) hex = "FF";
  return hex.toUpperCase();
}

function toDec(hex) {
  return parseInt(hex, 16);
}

export default createSwatches;
