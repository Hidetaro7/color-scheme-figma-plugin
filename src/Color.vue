<template>
  <div class="color-scheme" ref="colorScheme" :class="{ 'is-dark': isDark }">
    <header class="app-header">
      <h1>Color Scheme</h1>
      <div class="options">
        <span>Theme</span>
        <toggle-button color="#333" @change="isDark = !isDark" />
      </div>
    </header>
    <main class="app-main">
      <color-group
        v-for="(item, index) in colorGroups"
        :key="index"
        v-model="colorGroups[index]"
        @delete="deleteGroup"
      />
      <div class="create-newgroup" @click="addNewScheme">Add New Scheme</div>
    </main>
    <!-- <p>{{colorGroups}}</p> -->
    <div class="button-area">
      <button
        class="button button-create"
        @click="create"
        :style="{ 'background-color': prefix500 }"
      >Create Color Style on Figma</button>
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
        {
          id: null,
          defaultColor: {
            hex: "#666"
          },
          title: "gray",
          group: []
        },
        {
          id: null,
          defaultColor: {
            hex: "#b01f24"
          },
          title: "primary",
          group: []
        }
      ],
      prefix500: null,
      isDark: false
    };
  },
  methods: {
    deleteGroup(e) {
      const newGroup = this.colorGroups.filter(elem => {
        return elem.id !== e.id;
      });
      const result = confirm(`Can I delete "${e.title}"`);
      if (result) {
        this.colorGroups = newGroup;
      }
    },
    addNewScheme() {
      this.colorGroups.push({
        defaultColor: {
          hex: "#b01f24"
        },
        title: "(untitle)"
      });
    },
    create: function() {
      if (!this.colorGroups) return;
      parent.postMessage(
        {
          pluginMessage: { type: "create-rectangles", colors: this.colorGroups }
        },
        "*"
      );
    },
    cancel: function() {
      parent.postMessage({ pluginMessage: { type: "cancel" } }, "*");
    }
  },
  computed: {},
  watch: {
    colorGroups: {
      handler(newValue) {
        // primaryの重複を避ける
        let doubleCount = 0;
        newValue.forEach((elem, index) => {
          if (elem.title.toLowerCase() === "primary") {
            if (doubleCount > 0) {
              elem.title = elem.title + "-" + doubleCount;
              console.log(elem.title);
            }
            doubleCount++;
          }
        });

        // 下部ボタンをprimaryカラーに
        newValue.forEach((elem, index) => {
          if (elem.title === "primary") {
            this.prefix500 = elem.defaultColor.hex;
          }
        });
        // CSS変数にprimaryカラーを更新
        this.$refs.colorScheme.style.setProperty("--primary", this.prefix500);

        // スクロール
        setTimeout(() => {
          var element = document.documentElement;
          var bottom = element.scrollHeight - element.clientHeight;
          window.scroll(0, bottom);
        }, 100);
      },
      deep: true
    }
  }
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
  --primary: #c30643;
  display: flex;
  flex-direction: column;
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
  /* position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  z-index: 5; background-color: rgba(#fff, 0.9);*/

  border-bottom: 1px solid #eee;
  flex-shrink: 0;
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

.app-main {
  /* padding-top: 4rem;
  padding-bottom: 4rem; */
  flex-shrink: 1;
  overflow-y: auto;
}

.button-area {
  flex-shrink: 0; /* 
  position: fixed;
  bottom: 0;
  width: 100%;
  left: 0;
  background-color: rgba(#fff, 0.9); */
  padding: 1rem;
  .button-create {
    width: 100%;
    background-color: var(--primary);
    color: white;
    font-weight: 700;
  }
}
.create-newgroup {
  border-radius: 8px;
  border: 2px solid var(--primary);
  color: var(--primary);
  padding: 1rem;
  text-align: center;
  margin: 1rem;
  font-weight: 700;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
}
</style>
