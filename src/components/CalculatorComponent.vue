<template>
  <div class="min-h-screen p-4 md:p-8">
    <div class="mx-auto">
      <!-- Hero Section -->
      <div class="mb-8 md:mb-16 flex flex-col md:flex-row-reverse gap-4">
        <!-- Image Card -->
        <div class="md:w-3/5 md:h-[839px] bg-white rounded-[200px] overflow-hidden">
          <img
            src="@/assets/hero-img.png"
            alt="Person with washing machine and dog"
            class="w-full h-full object-cover"
          />
        </div>
        <!-- Copy Card -->
        <div
          class="md:w-2/5 md:h-[839px] bg-[#D9D4A7] rounded-[200px] p-10 flex flex-col justify-center items-center"
        >
          <p class="text-sm mb-2">Mini loan</p>
          <h1 class="text-[68px] leading-[5rem] font-bitter mb-4 text-center">
            <span class="italic">Take charge</span> of unexpected costs
          </h1>
          <p class="mb-6 text-center">
            Finance unforeseen expenses with Inbank. A quick and easy application process with an
            instant credit decision.
          </p>
          <button
            class="bg-white text-black px-6 py-2 rounded-full hover:bg-gray-100 transition duration-300"
            @click="scrollToCalculator"
          >
            Apply now
          </button>
        </div>
      </div>

      <!-- Calculator Section -->
      <div class="bg-[#E3D2FF] p-10 md:flex" ref="calculatorSection">
        <div class="md:w-1/2 my-20 mx-10 md:mb-0">
          <h2 class="text-[68px] leading-[5rem] mb-4 font-bitter">
            Calculate your <span class="italic">monthly payment</span>
          </h2>
          <p class="mb-6">
            Estimate your monthly payments based on the chosen loan amount and time period.
          </p>
        </div>
        <div class="w-px h-auto bg-[#21093A] mx-8 my-10 opacity-15 md:block hidden"></div>
        <div class="md:w-1/2 space-y-8">
          <div class="space-y-4">
            <div class="flex items-center space-x-4">
              <div class="flex-grow mt-10">
                <input
                  v-model="amount"
                  type="range"
                  min="300"
                  max="7200"
                  step="100"
                  class="w-full appearance-none bg-purple-300 h-1 rounded-full"
                />
                <div class="flex justify-between text-sm text-gray-600 mt-1">
                  <span>300 €</span>
                  <span>7,200 €</span>
                </div>
              </div>
              <div class="w-32">
                <label class="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                <input
                  v-model="amount"
                  type="number"
                  class="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>
            <div class="flex items-center space-x-4">
              <div class="flex-grow mt-10">
                <input
                  v-model="period"
                  type="range"
                  min="2"
                  max="72"
                  step="1"
                  class="w-full appearance-none bg-purple-300 h-1 rounded-full"
                />
                <div class="flex justify-between text-sm text-gray-600 mt-1">
                  <span>2 months</span>
                  <span>72 months</span>
                </div>
              </div>
              <div class="w-32">
                <label class="block text-sm font-medium text-gray-700 mb-1">Period</label>
                <select v-model="period" class="w-full p-2 border border-gray-300 rounded-md">
                  <option v-for="i in 71" :key="i" :value="i + 1">{{ i + 1 }} months</option>
                </select>
              </div>
            </div>
          </div>
          <div class="text-center">
            <h3 class="text-xl mb-2">Monthly payment</h3>
            <p class="text-5xl font-bold mb-4">{{ monthlyPayment }}€</p>
            <button
              class="bg-[#AA93FF] px-8 py-3 rounded-full hover:bg-purple-600 transition duration-300"
            >
              Apply now
            </button>
          </div>
          <p class="text-xs text-gray-600 text-center">
            The calculation is approximate and may differ from the conditions offered to you. Please
            submit a loan application to receive a personal offer. Financial services are provided
            by AS Inbank Finance.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const calculatorSection = ref<HTMLElement | null>(null);

function scrollToCalculator() {
  calculatorSection.value?.scrollIntoView({ behavior: 'smooth' });
}

const amount = ref(500);
const period = ref(48);

const monthlyPayment = computed(() => {
  const rate = 3.476;
  const monthlyRate = rate / 12;
  const numberOfPayments = period.value;

  const payment =
    (amount.value * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
    (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

  return payment.toFixed(2);
});
</script>

<style scoped>
input[type='range']::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #a78bfa;
  cursor: pointer;
  border: 2px solid white;
  box-shadow: 0 0 0 4px rgba(167, 139, 250, 0.3);
}

input[type='range']::-moz-range-thumb {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #a78bfa;
  cursor: pointer;
  border: 2px solid white;
  box-shadow: 0 0 0 4px rgba(167, 139, 250, 0.3);
}
</style>
