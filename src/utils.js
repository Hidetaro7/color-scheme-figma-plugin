import { h } from "vue";
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
  // HEXコードをRGBに変換
  let r = parseInt(hex.substring(1, 3), 16) / 255;
  let g = parseInt(hex.substring(3, 5), 16) / 255;
  let b = parseInt(hex.substring(5, 7), 16) / 255;

  // 最小値と最大値を計算
  const min = Math.min(r, g, b);
  const max = Math.max(r, g, b);

  // 明るさを計算
  let h,
    s,
    l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // 一色のみの場合
  } else {
    const d = max - min;
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

  // HSL値を[0, 360]の範囲に変換
  h = Math.round(h * 360);
  s = Math.round(s * 100);
  l = Math.round(l * 100);

  return { h, s, l };
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

export const createColorScheme = (rgb) => {
  const hsl = hex2hsl(rgb);
  const lightStep = 8;
  const darkStep = 3;

  const P0 = { x: 0, y: 100 };
  const P1 = { x: 50, y: 100 };
  const P2 = { x: 70, y: hsl.l };
  const P3 = { x: 70, y: 10 };
  const P4 = { x: 100, y: 10 };

  function quadraticBezier(A0, A1, A2, t) {
    const x =
      Math.pow(1 - t, 2) * A0.x +
      2 * (1 - t) * t * A1.x +
      Math.pow(t, 2) * A2.x;
    const y =
      Math.pow(1 - t, 2) * A0.y +
      2 * (1 - t) * t * A1.y +
      Math.pow(t, 2) * A2.y;
    return { x, y };
  }

  const createStepColor = (o) => {
    P4.y = P3.y = hsl.l < 20 ? 0 : 10;
    const point = quadraticBezier(o.v0, o.v1, o.v2, o.i / o.step);
    const reshsl = `hsl(${hsl.h}, ${hsl.s}%, ${point.y}%)`;
    const hex = hslToHex(hsl.h, hsl.s, point.y);
    return { hsl: reshsl, hex };
  };

  const resColors = [];
  for (let i = 1; i <= lightStep; i++) {
    resColors.push(
      createStepColor({ i, step: lightStep, v0: P0, v1: P1, v2: P2 })
    );
  }
  for (let i = 1; i <= darkStep; i++) {
    resColors.push(
      createStepColor({ i, step: darkStep, v0: P2, v1: P3, v2: P4 })
    );
  }
  //console.log(resColors);
  return resColors;
};
