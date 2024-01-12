import { schemes, sampleScheme } from "./store";

export const getScheme = (id) => {
  return schemes.value.find((scheme) => scheme.id === id);
};

export const setScheme = (id, scheme) => {
  const index = schemes.value.findIndex((scheme) => scheme.id === id);
  schemes.value[index] = scheme;
};

export const removeScheme = (id) => {
  const index = schemes.value.findIndex((scheme) => scheme.id === id);
  schemes.value.splice(index, 1);
};

export const addScheme = () => {
  const newScheme = { ...sampleScheme };
  newScheme.id = new Date().getUTCMilliseconds();
  schemes.value.push(newScheme);
};

export const hex2hsl = (hex) => {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

  var r = parseInt(result[1], 16);
  var g = parseInt(result[2], 16);
  var b = parseInt(result[3], 16);

  (r /= 255), (g /= 255), (b /= 255);
  var max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  var h,
    s,
    l = (max + min) / 2;

  if (max == min) {
    h = s = 0; // achromatic
  } else {
    var d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  s = s * 100;
  s = Math.round(s);
  l = l * 100;
  l = Math.round(l);
  h = Math.round(360 * h);

  return [h, s, l];
};

export const hslToHex = (h, s, l) => {
  l /= 100;
  const a = (s * Math.min(l, 1 - l)) / 100;
  const f = (n) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, "0"); // convert to Hex and prefix "0" if needed
  };
  return `#${f(0)}${f(8)}${f(4)}`;
};

export const easeInQuad = (x) => x * x;

export const createColorScheme = (rgb) => {
  const hsl = hex2hsl(rgb);
  const h = hsl[0];
  const s = hsl[1];
  const l = hsl[2];
  const min = l > 5 ? 5 : 1;
  const max = l < 97 ? 98.5 : 99.5;
  const step1 = parseInt((max - l) / 7);
  const step2 = parseInt((l - min) / 4);
  const resColors = [];
  // 薄い
  for (let i = 0; i < 7; i++) {
    //console.log(max - step1 * i);
    const resL = max - l * easeInQuad((i + 1) / 7);
    const lightness = resL < 99 ? resL : 99;
    resColors.push({
      hsl: `hsl(${h},${s}%,${lightness}%)`,
      hex: hslToHex(h, s, lightness),
    });
  }
  // 現在
  resColors.push({
    hsl: `hsl(${h},${s}%,${l}%)`,
    hex: hslToHex(h, s, l),
  });
  // hslToHex
  // 濃い
  for (let i = 4; i > 1; i--) {
    resColors.push({
      hsl: `hsl(${h},${s}%,${step2 * i}%)`,
      hex: hslToHex(h, s, step2 * i),
    });
  }
  return resColors;
};
