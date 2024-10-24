<template>
  <div class="flex flex-col justify-left px-10 py-6 md:px-10 md:py-6">
    <img :alt="altText" src="/assets/inbank-logo.svg" :class="logoClass" />
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps({
  altText: {
    type: String,
    default: 'Logo',
  },

  logoClass: {
    type: String,
    default: 'w-[113px] h-[40px] md:w-[182px] md:h-[64px]',
  },
});
</script>
