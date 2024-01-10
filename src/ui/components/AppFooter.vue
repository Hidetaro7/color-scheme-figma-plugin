<template>
  <footer class="p-4 flex justify-end bg-white/95">
    <button class="button" @click="create()">Apply Styles...</button>
  </footer>
</template>

<script setup>
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
