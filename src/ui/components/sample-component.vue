<script setup>
import { ref, computed } from "vue";
const rgb = ref("#ff0000");

const variantColors = computed(() => {
  const hsl = hex2hsl(rgb.value);
  const h = hsl[0];
  const s = hsl[1];
  const l = hsl[2];
  const min = l > 10 ? 10 : 0;
  const max = l < 97 ? 98.5 : 99.5;
  const step1 = parseInt((max - l) / 7);
  const step2 = parseInt((l - min) / 4);
  const resColors = [];
  // 薄い
  for (let i = 0; i < 7; i++) {
    //console.log(max - step1 * i);
    resColors.push(`hsl(${h},${s}%,${max - step1 * i}%)`);
  }
  // 現在
  resColors.push(`hsl(${h},${s}%,${l}%)`);
  // 濃い
  for (let i = 4; i > 1; i--) {
    resColors.push(`hsl(${h},${s}%,${step2 * i}%)`);
  }
  return resColors;
});

const hex2hsl = (hex) => {
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
const hslToHex = (h, s, l) => {
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
</script>

<template>
  <p>Color: <input type="color" v-model="rgb" /></p>

  {{ rgb }}

  <div class="flex items-center gap-2">
    <div
      v-for="color in variantColors"
      class="w-12 h-12 rounded"
      :style="{ backgroundColor: color }"
    >
      {{ color }}
    </div>
  </div>
</template>

<style lang="scss"></style>
