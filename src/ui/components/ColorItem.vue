<script setup>
import { ref, computed } from "vue";
import { Icon } from "@iconify/vue";
import { schemes, tokens } from "../../store.js";
import {
  hex2hsl,
  hslToHex,
  easeInQuad,
  createColorScheme,
  getScheme,
  setScheme,
  removeScheme,
} from "../../utils.js";

const props = defineProps({
  colors: {
    type: Object,
    required: true,
  },
});

const current = getScheme(props.colors.id);

const rgb = ref(current["700"]);
const newColors = ref(props.colors);

const variantColors = computed(() => {
  const res = createColorScheme(rgb.value);
  res
    .map((color) => color.hex)
    .forEach((value, i) => {
      newColors.value[tokens[i]] = value;
    });
  setScheme(props.colors.id, newColors.value);
  return res;
});

const removeItem = () => removeScheme(props.colors.id);
</script>

<template>
  <div class="flex items-center gap-x-4 py-4">
    <div class="w-[120px]">
      <div
        class="w-full aspect-square rounded-full relative overflow-hidden hover:ring-2 hover:ring-offset-2 transition-all duration-200"
        :style="{ backgroundColor: rgb }"
      >
        <input
          type="color"
          v-model="rgb"
          class="appearance-none absolute inset-0 w-full h-full border-0 opacity-0"
        />
      </div>
      <div class="text-center my-2">
        <div class="font-semibold text-xs text-gray-600">
          {{ current.prefix }}-700
        </div>
        <div class="text-[10px] text-gray-400">{{ rgb }}</div>
      </div>
    </div>
    <div class="grow">
      <div class="mb-2 flex items-center gap-x-4">
        <input type="text" class="input" v-model="current.prefix" />
        <button
          class="icon-button disabled:text-gray-300 hover:disabled:bg-transparent"
          @click="removeItem"
          :disabled="schemes.length <= 1"
        >
          <Icon
            icon="material-symbols:delete-outline-rounded"
            class="text-lg"
          />
        </button>
      </div>
      <div class="flex items-center gap-3">
        <div class="w-10 text-center" v-for="(color, index) in variantColors">
          <div
            class="w-10 h-10 rounded-full"
            :style="{ backgroundColor: color.hex }"
          ></div>
          <div class="text-gray-700 mt-2 text-xs font-semibold">
            {{ tokens[index] }}
          </div>
          <div class="text-gray-400 text-[10px]">{{ color.hex }}</div>
          <!-- <div class="text-[10px]">{{ color.hsl }}</div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss"></style>
