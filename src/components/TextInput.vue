<!-- src/components/TextInput.vue -->
<template>
  <div class="mb-4">
    <div class="relative">
      <input
        :id="id"
        :type="type"
        :value="modelValue"
        @input="handleInput"
        @focus="isActive = true"
        @blur="isActive = false"
        :placeholder="placeholder"
        :class="[
          'w-full px-3 py-2 border rounded-md transition-colors duration-200 ease-in-out',
          'focus:outline-none focus:ring-2 focus:ring-opacity-50',
          'placeholder-transparent caret-transparent',
          fullWidth ? 'w-full' : 'md:w-[160px]',
          inputColorClass,
          { 'placeholder-gray-400': !isActive && !isError },
          disabled ? 'text-gray-400' : '',
        ]"
        :disabled="disabled"
      />
      <label
        :for="id"
        :class="[
          'absolute left-3 bg-white px-1 transition-all duration-200 ease-in-out rounded-lg',
          labelColor,
          modelValue || isActive ? '-top-2.5 text-sm' : 'top-2 text-base',
          disabled ? 'text-gray-400 bg-[#efefef4c]' : '',
        ]"
      >
        {{ label }}
      </label>
    </div>
    <p :class="['mt-1 text-sm', supportingTextColor]">{{ supportingText }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const props = defineProps({
  disabled: { type: Boolean, default: false },
  fullWidth: { type: Boolean, default: true },
  id: { type: String, required: true },
  isError: { type: Boolean, default: false },
  label: { type: String, required: true },
  modelValue: { type: [String, Number], default: '' },
  placeholder: { type: String, default: '' },
  supportingText: { type: String, default: '' },
  type: { type: String, default: 'text' },
});

const emit = defineEmits(['update:modelValue']);

const isActive = ref(false); // Local state for isActive

const inputColorClass = computed(() => {
  if (props.isError) return 'border-red-500 focus:border-red-500 focus:ring-red-500';
  if (isActive.value) return 'border-[#60378B] focus:border-[#60378B] focus:ring-purple-500';
  return 'border-gray-300 focus:border-purple-500 focus:ring-purple-500';
});

const labelColor = computed(() => {
  if (props.disabled) return 'text-gray-400';
  if (props.isError) return 'text-red-500';
  if (isActive.value) return 'text-[#60378B]';
  return 'text-gray-700';
});

const supportingTextColor = computed(() => {
  if (props.isError) return 'text-red-500';
  if (isActive.value) return 'text-[#606060]';
  return 'text-[#606060]';
});

const handleInput = (event: Event) => {
  if (event.target && event.target instanceof HTMLInputElement) {
    emit('update:modelValue', event.target.value);
  }
};
</script>
