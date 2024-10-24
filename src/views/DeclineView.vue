<template>
  <LogoComponent altText="Inbank logo" />
  <div class="flex w-full justify-center items-center md:p-16 md:px-42 md:py-32">
    <div
      class="bg-white rounded-[20px] w-full max-w-[600px] p-8 md:p-16 shadow-[0px 0px 40px 0px rgba(0, 0, 0, 0.04)] text-center"
    >
      <h1 class="text-3xl md:text-4xl font-bitter mb-4 text-center">
        <span class="italic">Dear </span> {{ firstName }}
      </h1>
      <p class="text-md mb-8 text-center text-[#21093A]">Unfortunately, your loan was denied.</p>
      <div class="h-px bg-gray-200 my-2"></div>

      <p class="text-md font-light m-6 text-center">
        In addition to your income and expenses, a number of other factors play a role in loan
        decisions.
      </p>
      <div class="h-px bg-gray-200 my-2"></div>

      <BaseButton @click="$router.push('/')" class="w-full mt-8">Exit</BaseButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useCalculatorStore } from '../stores/calculator';
import LogoComponent from '@/components/LogoComponent.vue';
import BaseButton from '@/components/BaseButton.vue';

const store = useCalculatorStore();

const firstName = computed(() => store.firstName || 'Valued Customer');
</script>
