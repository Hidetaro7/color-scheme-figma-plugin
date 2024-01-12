<template>
  <footer class="p-4 flex justify-end bg-gray-50/90 z-10">
    <button
      :style="{ 'background-color': schemes[0]['700'] }"
      class="button font-semibold"
      @click="create()"
    >
      Apply {{ schemes.length }} Styles...
    </button>
  </footer>
</template>

<script setup>
import { schemes } from "../../store.js";
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
