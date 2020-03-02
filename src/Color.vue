<template>
  <div class="color-scheme" :class="{ 'is-dark': isDark }">
    <header class="app-header">
      <h1>Color Scheme</h1>
      <div class="options">
        <span>Theme</span>
        <toggle-button color="#333" @change="isDark = !isDark" />
      </div>
    </header>
    <color-group
      v-for="(item, index) in colorGroups"
      :key="index"
      :defaultColor="{ hex: item.color }"
      :title="item.title"
      @change-color="changeColor"
    />

    <div class="button-area">
      <button
        class="button button-create"
        @click="create"
        :style="{ 'background-color': prefix500 }"
      >
        Create Color Style on Figma
      </button>
    </div>
  </div>
</template>

<script>
import tinycolor from "tinycolor2";
import { Sketch } from "vue-color";
import createSwatches from "./ColorChanger";
import ColorGroup from "./ColorGroup";
import { ToggleButton } from "vue-js-toggle-button";

export default {
  components: {
    "chrome-picker": Sketch,
    "color-group": ColorGroup,
    "toggle-button": ToggleButton
  },
  data() {
    return {
      colorGroups: [
        { color: "#9E9E9E", title: "gray" },
        { color: "#b01f24", title: "primary" }
      ],
      combination: [{ prefix: "primary" }, { prefix: "gray" }],
      prefix500: null,
      isDark: false
    };
  },
  methods: {
    onChangeTheme() {},
    changeColor(e) {
      let group = this.combination.forEach((elem, index) => {
        if (elem.prefix === e.prefix) {
          this.combination[index] = e;
          if (elem.prefix === "primary" && elem.colors) {
            this.prefix500 = elem.colors[5].color;
          }
        }
      });
    },
    create: function() {
      if (!this.combination) return;
      parent.postMessage(
        {
          pluginMessage: { type: "create-rectangles", colors: this.combination }
        },
        "*"
      );
    },
    cancel: function() {
      parent.postMessage({ pluginMessage: { type: "cancel" } }, "*");
    }
  },
  computed: {},
  watch: {}
};
</script>
<style>
body,
html {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 100%;
}
body {
  margin: 0;
}
* {
  box-sizing: border-box;
}
</style>
<style lang="scss" scoped>
.color-scheme {
  height: 100vh;
  color: #333;
  &.is-dark {
    color: #fff;
    background-color: #111;
  }
}
.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  h1 {
    letter-spacing: -0.02em;
    font-weight: 900;
    margin: 0;
  }
  .options {
    display: flex;
    align-items: center;
    & > * {
      margin: 5px;
    }
  }
}
button {
  border-radius: 4px;
  font-size: 120%;
  padding: 12px 0;
  outline: none;
  cursor: pointer;
  border: none;
  &:hover {
    opacity: 0.8;
  }
}

.button-area {
  position: fixed;
  bottom: 0;
  width: 100%;
  left: 0;
  padding: 1rem;
  .button-create {
    width: 100%;
    background-color: #c30643;
    color: white;
    font-weight: 700;
  }
}
</style>
