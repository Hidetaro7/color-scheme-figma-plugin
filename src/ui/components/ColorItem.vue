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
        <div
          class="w-10 text-center relative"
          v-for="(color, index) in variantColors"
        >
          <div
            v-if="tokens[index] === '700'"
            class="absolute left-1/2 -top-2 -translate-x-1/2 -translate-y-full"
          >
            <div class="tag tag-help">
              Default
              <button class="icon-button w-auto h-auto hover:bg-primary-900">
                <Icon icon="material-symbols:help" class="text-sm" />
              </button>
            </div>
          </div>
          <div
            class="w-10 h-10 rounded-full"
            :style="{ backgroundColor: color.hex }"
            :class="{
              'border border-gray-300': index < 3,
              'default-color': tokens[index] === '700',
            }"
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

<style lang="scss" scoped>
.default-color {
  @apply ring-2 ring-offset-2 ring-gray-300;
}
.tag {
  @apply bg-gray-200 text-gray-500 text-[10px] px-2 rounded-full leading-none;
}
.tag-help {
  @apply flex gap-x-1 items-center;
  .icon-button {
    @apply hover:bg-gray-300 hover:text-gray-800 active:text-primary-900;
  }
}
</style>
