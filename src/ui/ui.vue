<script lang="ts" setup>
import SampleComponent from "./components/sample-component.vue";

// methods
const create = () => {
  window.parent.postMessage(
    { pluginMessage: { type: "create-rectangles", count: 5 } },
    "*"
  );
};
const cancel = () => {
  window.parent.postMessage({ pluginMessage: { type: "cancel" } }, "*");
};
</script>

<template>
  <sample-component />
  <button id="create" @click="create()">Create</button>
  <button id="cancel" @click="cancel()">Cancel</button>
</template>

<style lang="scss"></style>
