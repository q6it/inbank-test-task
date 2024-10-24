<template>
  <LogoComponent altText="Inbank logo" />
  <div class="flex w-full justify-center items-center pt-4 md:p-16 md:px-42 md:py-32">
    <div
      class="bg-white rounded-[20px] flex flex-col md:flex-row md:w-[1200px] shadow-[0px 0px 40px 0px rgba(0, 0, 0, 0.04)]"
    >
      <div
        class="flex justify-center items-center bg-[#F0F0EA] relative mx-auto md:mx-0 w-[240px] h-[240px] md:w-[600px] md:h-[600px] rounded-[100px] md:rounded-[20px]"
      >
        <img
          src="/assets/success.webp"
          alt="Man buying things"
          class="w-[160px] md:w-full md:h-auto object-cover rounded-t-[20px] md:rounded-[20px] md:absolute md:top-10 md:left-14"
        />
      </div>

      <div
        class="flex flex-col justify-start items-center md:text-left md:pl-16 md:mt-8 w-full md:w-[600px] p-8 md:ml-24 md:px-24"
      >
        <h1 class="text-[48px] font-bitter mb-4"><span class="italic">Good</span> news!</h1>
        <p class="text-md mb-8">Your loan has been approved.</p>
        <div class="mb-8 w-full">
          <div class="h-px bg-gray-200 my-2"></div>
          <div class="flex justify-between mb-2">
            <span>Loan amount</span>
            <span>{{ formattedAmount }} €</span>
          </div>
          <div class="h-px bg-gray-200 my-2"></div>
          <div class="flex justify-between mb-2">
            <span>Loan period</span>
            <span>{{ period }} months</span>
          </div>
          <div class="h-px bg-gray-200 my-2"></div>
          <div class="flex justify-between">
            <span>Monthly payment</span>
            <span>{{ formattedMonthlyPayment }} €</span>
          </div>
          <div class="h-px bg-gray-200 my-2"></div>
        </div>
        <BaseButton @click="$router.push('/')" class="w-full md:mt-8">Back to home page</BaseButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useCalculatorStore } from '../stores/calculator';
import LogoComponent from '@/components/LogoComponent.vue';
import BaseButton from '@/components/BaseButton.vue';

const store = useCalculatorStore();

const formattedAmount = computed(() => store.amount.toLocaleString());
const period = computed(() => store.period);
const formattedMonthlyPayment = computed(() => store.calculatedMonthlyPayment.toFixed(2));
</script>
