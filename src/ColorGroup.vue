<template>
  <div class="color-group">
    <div class="combination">
      <div
        class="main-color"
        :style="{
          color: isInvertText ? '#000' : '#fff',
          'background-color': myValue.defaultColor.hex
        }"
        @click="isShowPicker = true"
      >
        <div>
          <span v-text="myValue.title"></span>-500
        </div>
        <small>Default</small>
        <div class="hex-code" v-text="myValue.defaultColor.hex"></div>
        <div class="border" :style="{ 'border-color': myValue.defaultColor.hex }"></div>
      </div>
      <div class="combination-wrapper">
        <div class="control-bar">
          <div class="prefix-input">
            <input type="text" @focus="selectText" class="prefix-title" v-model="myValue.title" />
          </div>
          <div class="options">
            <div class="navbtn delete" data-name="Delete" @click="$emit('delete', value)">
              <img src="./icon_trash.svg" alt="delete" />
            </div>
          </div>
        </div>
        <div class="swatches">
          <div class="combination-item" v-for="(item, index) in myValue.group" :key="index">
            <div :style="{ 'background-color': item.color }" class="swatch"></div>
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
        <chrome-picker v-model="myValue.defaultColor"></chrome-picker>
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
      isInvertText: false,
      isShowPicker: false
    };
  },
  props: {
    value: {
      type: Object,
      default: {
        id: null,
        title: "testTitle",
        defaultColor: {
          hex: "#ff0000"
        },
        group: []
      }
    }
  },
  computed: {
    myValue: {
      set(val) {
        this.$emit("input", val);
      },
      get() {
        return this.value;
      }
    }
  },
  methods: {
    selectText(e) {
      e.target.select();
    },
    emit() {
      /* this.$emit("input", {
        id: this.id
      }); */
    }
  },
  watch: {
    "myValue.defaultColor": function(val) {
      this.myValue.group = createSwatches(tinycolor(val.hex).toHexString());
    },
    myValue: {
      handler(val) {
        this.$emit("input", val);
      },
      deep: true
    }
  },
  created() {
    this.myValue.id = uuidv4();
    this.myValue.group = createSwatches(
      tinycolor(this.myValue.defaultColor.hex).toHexString()
    );
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
.control-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .options {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .navbtn {
      position: relative;
      cursor: pointer;
      img {
        position: relative;
        z-index: 3;
        opacity: 0.6;
      }
      &::after {
        display: none;
        content: attr(data-name);
        color: #666;
        position: absolute;
        font-size: 10px;
        font-weight: 600;
        top: 0;
        left: 50%;
        background-color: #eee;
        padding: 3px 6px;
        line-height: 1;
        border-radius: 4px;
        z-index: 3;
      }
      &:hover {
        &::before {
          content: "";
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background-color: #f9f9f9;
          position: absolute;
          top: -5px;
          left: -5px;
          display: block;
          z-index: 1;
        }
        &::after {
          display: block;
          transform: translate(-50%, -1.4rem) scale(1);
        }
      }
      &:active {
        img {
          opacity: 1;
        }
        &::before {
          background-color: #ececec;
        }
      }
    }
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
