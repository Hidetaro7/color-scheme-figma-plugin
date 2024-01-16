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
import { schemes, tokens } from "../../store.js";
const create = () => {
  window.parent.postMessage(
    {
      pluginMessage: {
        type: "color-schemes",
        message: JSON.stringify({ schemes: schemes.value, tokens }),
      },
    },
    "*"
  );
};
const cancel = () => {
  window.parent.postMessage({ pluginMessage: { type: "cancel" } }, "*");
};
</script>
