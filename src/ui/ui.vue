<script lang="ts" setup>
import { ref, computed } from "vue";
import ColorItem from "./components/ColorItem.vue";
import ModalDialog from "./components/ModalDialog.vue";
import { Icon } from "@iconify/vue";
import AppFooter from "./components/AppFooter.vue";
import AppHeader from "./components/AppHeader.vue";
import { schemes } from "../store.js";
import { addScheme } from "../utils.js";
</script>

<template>
  <div class="h-screen relative flex flex-col w-screen">
    <AppHeader class="sticky top-0" />
    <div class="container grow py-2">
      <ColorItem v-for="colors in schemes" :colors="colors" :key="colors.id" />
      <div class="my-2 text-center">
        <button class="text-button" @click="addScheme">add</button>
      </div>
    </div>

    <AppFooter class="sticky bottom-0" />
    <ModalDialog :open="true" />
  </div>
</template>

<style lang="scss"></style>
