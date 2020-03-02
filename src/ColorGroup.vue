<template>
  <div class="color-group">
    <div class="combination">
      <div
        class="main-color"
        :style="{
          color: isInvertText ? '#000' : '#fff',
          'background-color': colors.hex
        }"
        @click="isShowPicker = true"
      >
        <div><span v-text="prefix"></span>-500</div>
        <small>Default</small>
        <div class="hex-code" v-text="colors.hex"></div>
        <div class="border" :style="{ 'border-color': colors.hex }"></div>
      </div>
      <div class="combination-wrapper">
        <div class="prefix-input">
          <input
            type="text"
            @focus="selectText"
            class="prefix-title"
            v-model="prefix"
          />
        </div>
        <div class="swatches">
          <div
            class="combination-item"
            v-for="(item, index) in combination"
            :key="index"
          >
            <div
              :style="{ 'background-color': item.color }"
              class="swatch"
            ></div>
            <div class="label" :class="{ 'is-white': index >= 4 }">
              <span v-text="item.label"></span>
            </div>
            <div class="color-code" v-text="item.color"></div>
          </div>
        </div>
      </div>

      <div class="color-picker-wrapper" v-if="isShowPicker">
        <div class="close-colorpicker" @click="isShowPicker = false">
          <img src="./close.svg" alt="close" />
        </div>
        <chrome-picker v-model="colors"></chrome-picker>
      </div>
    </div>
  </div>
</template>

<script>
import tinycolor from "tinycolor2";
import { Chrome } from "vue-color";
import createSwatches from "./ColorChanger";
import { v4 as uuidv4 } from "uuid";

export default {
  components: {
    "chrome-picker": Chrome
  },
  data() {
    return {
      id: null,
      prefix: "(untitled)",
      combination: [],
      colors: {},
      isInvertText: false,
      isShowPicker: false
    };
  },
  props: {
    defaultColor: {
      type: Object,
      default: {
        hex: "#194d33",
        hsl: { h: 0, s: 0.5, l: 0.2, a: 1 },
        hsv: { h: 0, s: 0.66, v: 0.3, a: 1 },
        rgba: { r: 255, g: 77, b: 51, a: 1 },
        a: 1
      }
    },
    title: {
      type: String,
      default: "(untitled)"
    }
  },
  computed: {},
  methods: {
    selectText(e) {
      e.target.select();
    },
    emit() {
      this.$emit("change-color", {
        id: this.id,
        prefix: this.prefix,
        colors: this.combination
      });
    }
  },
  watch: {
    prefix(newPrefix) {
      this.emit();
    },
    colors(newColor, oldColor) {
      this.isInvertText = tinycolor.isReadable("#000", newColor.hex, {});
      this.combination = createSwatches(tinycolor(newColor.hex).toHexString());
      this.emit();
    }
  },
  created() {
    if (this.defaultColor.hex) {
      this.color = this.defaultColor;
      this.colors = this.defaultColor;
    }
    if (this.title !== "") {
      this.prefix = this.title;
    }
    this.id = uuidv4();
    this.combination = createSwatches(tinycolor(this.color.hex).toHexString());
    //console.log(this.color.hex);
    this.emit();
  }
};
</script>
<style lang="scss" scoped>
$primary: #006aa9;
.color-group {
  padding: 1rem;
  position: relative;
}
.main-color {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-right: 1rem;
  flex-shrink: 0;
  position: relative;
  cursor: pointer;
  span,
  div,
  small {
    font-weight: 700;
    line-height: 1.3;
  }
  span {
    font-size: 1.2rem;
  }
  .border {
    width: 158px;
    height: 158px;
    border: 1px dashed #000;
    position: absolute;
    border-radius: 50%;
    left: -4px;
    top: -4px;
  }
  &:hover {
    opacity: 0.9;
    .border {
    }
  }
}
.prefix-input {
  padding-right: 0;
  background: url(./pencil.svg) right center no-repeat;
  display: inline-block;
}
.prefix-title {
  font-size: 1.2rem;
  font-weight: 700;
  appearance: none;
  -webkit-appearance: none;
  border: none;
  border-bottom: 1px solid #ccc;
  padding-bottom: 5px;
  outline: none;
  margin-bottom: 5px;
  background-color: transparent;
  color: inherit;
  &:focus {
    border-bottom: 1px solid $primary;
    color: $primary;
  }
}
.combination {
  display: flex;
  align-items: center;
}
.combination-item {
  display: inline-flex;
  align-items: center;
  width: 50px;
  height: 50px;
  position: relative;
  .swatch {
    position: absolute;
    left: 5px;
    top: 5px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
  .label {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    line-height: 1;
    font-weight: 600;
    font-size: 10px;
    color: #000;
    &.is-white {
      color: #fff;
    }
  }
  .color-code {
    position: absolute;
    bottom: -1.4em;
    left: 50%;
    font-size: 10px;
    transform: translateX(-50%);
  }
}

.color-picker-wrapper {
  position: absolute;
  z-index: 100;
  left: 50px;
  top: 130px;
  border: 1px solid #ccc;
  background-color: #fff;
  border-radius: 6px;
  padding: 0.5rem 0.5rem 0;
  /deep/ {
    .vc-chrome {
      box-shadow: none;
    }
  }
  .close-colorpicker {
    display: inline-block;
    background-color: #fff;
    border-radius: 50%;
    padding: 2px;
    position: absolute;

    left: -14px;
    top: -14px;
    cursor: pointer;
    &:hover {
      opacity: 0.9;
    }
  }
}
</style>
