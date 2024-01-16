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
        <button
          class="add-button border-gray-300 hover:border-gray-400 text-gray-400 outlined-button rounded-full flex items-center gap-x-2 mx-auto px-4 py-2 transition-all duration-200 text-sm hover:filter-none hover:bg-white"
          @click="addScheme"
        >
          <span
            class="icon-[material-symbols--add-circle-outline-rounded] text-xl"
          ></span>
          add color...
        </button>
      </div>
    </div>

    <AppFooter class="sticky bottom-0" />
    <ModalDialog :open="false" />
  </div>
</template>

<style lang="scss"></style>
