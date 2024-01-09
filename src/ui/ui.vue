<script lang="ts" setup>
import SampleComponent from "./components/sample-component.vue";
import { Icon } from "@iconify/vue";
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
  <Icon icon="material-symbols:delete-outline-rounded" />
  <button id="create" @click="create()">Create</button>
  <button id="cancel" @click="cancel()">Cancel</button>
</template>

<style lang="scss"></style>
