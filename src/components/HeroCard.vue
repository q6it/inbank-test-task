<template>
  <div
    :class="[
      'md:w-3/5 md:h-[839px] rounded-[100px] md:rounded-[200px] overflow-hidden ',
      { 'bg-white': type === 'image', 'bg-[#D9D4A7]': type === 'copy' },
    ]"
    :style="{ width: computedWidth }"
  >
    <template v-if="type === 'image'">
      <img
        :src="(content as ImageContent).imageSrc"
        :alt="(content as ImageContent).imageAlt"
        class="w-full h-full object-cover"
      />
    </template>
    <template v-else>
      <div class="p-10 flex flex-col justify-center items-center h-full">
        <p class="text-md mb-4">{{ (content as CopyContent).subtitle }}</p>
        <h1 class="text-3xl lg:text-[68px] lg:leading-[5rem] font-bitter mb-4 text-center">
          <span class="italic">{{ (content as CopyContent).titleItalic }}</span>
          {{ (content as CopyContent).titleNormal }}
        </h1>
        <p class="mb-6 text-md font-light text-center">
          {{ (content as CopyContent).description }}
        </p>
        <BaseButton
          @click="$emit('scrollToCalculator')"
          class="bg-white text-black px-4 md:px-6 md:py-2 rounded-full hover:bg-gray-100 transition duration-300"
          >{{ (content as CopyContent).buttonText }}</BaseButton
        >
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref, onMounted, onUnmounted } from 'vue';
import BaseButton from './BaseButton.vue';

interface ImageContent {
  imageSrc: string;
  imageAlt: string;
}

interface CopyContent {
  subtitle: string;
  titleItalic: string;
  titleNormal: string;
  description: string;
  buttonText: string;
}

const props = defineProps({
  type: { type: String as () => 'image' | 'copy', required: true },
  content: { type: Object as () => ImageContent | CopyContent, required: true },
  width: { type: String, default: '' },
});

const computedWidth = ref(props.width);

const updateWidth = () => {
  computedWidth.value = window.innerWidth <= 768 ? '100%' : props.width;
};

onMounted(() => {
  updateWidth(); // Set initial width
  window.addEventListener('resize', updateWidth);
});

onUnmounted(() => {
  window.removeEventListener('resize', updateWidth);
});

defineEmits<{
  (e: 'scrollToCalculator'): void;
}>();
</script>
