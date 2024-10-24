<template>
  <button
    :class="[
      'py-2 px-4 rounded-full transition duration-300 h-12',
      width === 'full' ? 'w-full' : '',
      'bg-button hover:bg-button-hover focus:bg-button-focus active:bg-button-pressed disabled:bg-button-disabled disabled:cursor-not-allowed',
      className,
    ]"
    :style="buttonStyles"
    :type="type"
    :disabled="disabled"
    @click="$emit('click')"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, computed } from 'vue';

const props = defineProps({
  type: {
    type: String as () => 'button' | 'submit' | 'reset',
    default: 'button',
  },
  width: {
    type: String,
    default: 'auto',
  },
  bgColor: {
    type: String,
    default: '#AA93FF',
  },
  hoverColor: {
    type: String,
    default: '#BBA8FF',
  },
  focusColor: {
    type: String,
    default: '#BBA8FF',
  },
  pressedColor: {
    type: String,
    default: '#9F85FF',
  },
  disabledColor: {
    type: String,
    default: '#DEDEDE',
  },
  className: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

defineEmits(['click']);

const buttonStyles = computed(() => ({
  '--button-bg': props.bgColor,
  '--button-hover': props.hoverColor,
  '--button-focus': props.focusColor,
  '--button-pressed': props.pressedColor,
  '--button-disabled': props.disabledColor,
}));
</script>

<style>
.bg-button {
  background-color: var(--button-bg);
}
.bg-button-hover:hover:not(:disabled) {
  background-color: var(--button-hover);
}
.bg-button-focus:focus:not(:disabled) {
  background-color: var(--button-focus);
}
.bg-button-pressed:active:not(:disabled) {
  background-color: var(--button-pressed);
}
.bg-button-disabled:disabled {
  background-color: var(--button-disabled);
}
</style>
