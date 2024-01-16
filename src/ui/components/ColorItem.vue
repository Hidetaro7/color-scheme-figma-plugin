<script setup>
import { ref, computed } from "vue";
import { Icon, iconExists, listIcons } from "@iconify/vue";
import { schemes, tokens } from "../../store.js";
import ModalDialog from "./ModalDialog.vue";
import {
  hex2hsl,
  hslToHex,
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
const helpOpen = ref(false);
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
        <input
          type="text"
          class="input"
          v-model="current.prefix"
          @focus="$event.target.select()"
        />

        <button
          class="icon-button disabled:text-gray-300 hover:disabled:bg-transparent"
          @click="removeItem"
          :disabled="schemes.length <= 1"
        >
          <span
            class="icon-[material-symbols--delete-forever-rounded] text-xl"
          ></span>
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
            <div
              class="tag-help bg-gray-200 text-gray-500 text-[10px] p-0.5 px-2 rounded-full leading-none flex gap-x-1 items-center relative"
            >
              Default
              <button
                class="icon-button w-auto h-auto"
                @click="helpOpen = true"
              >
                <span class="icon-[material-symbols--help] text-sm"></span>
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

      <ModalDialog :open="helpOpen" @close="helpOpen = false">
        <template v-slot:header> 700をデフォルトにする </template>
        <template v-slot:body>
          <div class="text-sm">
            <p>
              これまでの経験や学びから、プライマリカラーを11段階中の薄い方から8番目（700）をデフォルトにすることにしました。
            </p>
            <p>
              理由としては、濃い色の利用頻度よりも薄い色の利用頻度が高いからで、影やボーダーの微妙な濃淡が豊富なほうが、デザインの幅が広がると考えたからです。
            </p>
            <p>
              Figma/Githubコミュニティ上で公開しているデザインシステム
              <a
                href="https://www.figma.com/community/file/1042706969451783914/jumpu-ui-tailwind-css-components"
                target="_blank"
                rel="noopener noreferrer"
                class="text-primary-700 underline"
              >
                Jumpu UI
              </a>
              でもそのルールに従い、プライマリカラー700をデフォルトとしたトークンルールを定めています。
            </p>
          </div>
        </template>
      </ModalDialog>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.default-color {
  @apply ring-2 ring-offset-2 ring-gray-300;
  @apply shadow-sm;
}
.tag-help {
  .icon-button {
    @apply hover:bg-gray-300 hover:text-gray-800 active:text-primary-900;
  }
  &::after {
    border: 4px solid transparent;
    @apply absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-t-gray-200;
    content: "";
  }
}
</style>
