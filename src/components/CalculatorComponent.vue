<template>
  <LogoComponent />
  <div class="min-h-screen p-4 md:p-8">
    <div class="mx-auto">
      <div class="mb-8 md:mb-16 flex flex-col md:flex-row-reverse gap-4">
        <HeroCard
          type="image"
          :content="{
            imageSrc: '/assets/hero-img.webp',
            imageAlt: 'Person with washing machine and dog',
          }"
        />
        <HeroCard
          type="copy"
          :content="{
            subtitle: 'Mini loan',
            titleItalic: 'Take charge',
            titleNormal: 'of unexpected costs',
            description:
              'Finance unforeseen expenses with Inbank. A quick and easy application process with an instant credit decision.',
            buttonText: 'Apply now',
          }"
          width="40%"
          @scrollToCalculator="scrollToCalculator"
        />
      </div>

      <div class="bg-[#E3D2FF] pt-10 px-4 md:p-10 md:flex" ref="calculatorSection">
        <div class="md:w-1/2 md:my-20 md:mx-10 md:mb-0 md:px-8">
          <h2
            class="text-[32px] md:text-[68px] md:text-center leading[36px] md:leading-[5rem] mb-4 font-bitter"
          >
            Calculate <br />your
            <span class="italic">monthly payment</span>
          </h2>
          <p class="mb-6 font-light md:text-center">
            Estimate your monthly payments based on the chosen loan amount and time period.
          </p>
        </div>
        <div class="w-px h-auto bg-[#21093A] mx-8 mt-10 opacity-15 md:block hidden"></div>

        <div class="md:w-1/2 space-y-8">
          <div class="space-y-4">
            <div class="flex flex-col md:flex-row items-center space-y-4 md:space-x-4">
              <div class="w-full flex-grow md:mt-10 order-2 md:order-none">
                <input
                  v-model="store.amount"
                  type="range"
                  :min="300"
                  :max="7200"
                  step="100"
                  class="w-full appearance-none bg-purple-300 h-1 rounded-full"
                  @input="updateRangeBackground($event, 'amount')"
                />
                <div class="flex justify-between text-sm text-gray-600 mt-3 md:mt-1">
                  <span class="text-[#606060]">300 €</span>
                  <span class="text-[#606060]">7,200 €</span>
                </div>
              </div>
              <div class="w-full md:w-32 order-1 md:order-none">
                <TextInput
                  v-model="store.amount"
                  label="Amount"
                  type="text"
                  :min="300"
                  :max="7200"
                  id="amount-input"
                />
              </div>
            </div>
            <div class="flex flex-col md:flex-row items-center space-y-4 md:space-x-4">
              <div class="w-full flex-grow md:mt-10 order-2 md:order-none">
                <input
                  v-model="store.period"
                  type="range"
                  :min="2"
                  :max="72"
                  step="1"
                  class="w-full appearance-none bg-purple-300 h-1 rounded-full"
                  @input="updateRangeBackground($event, 'period')"
                />
                <div class="flex justify-between text-sm text-gray-600 mt-3 md:mt-1">
                  <span class="text-[#606060]">2 months</span>
                  <span class="text-[#606060]">72 months</span>
                </div>
              </div>
              <div class="w-full md:w-32 order-1 md:order-none">
                <SelectInput
                  v-model="store.period"
                  label="Period"
                  :options="periodOptions"
                  id="period-select"
                  :isError="false"
                  :disabled="false"
                  supportingText=""
                >
                </SelectInput>
              </div>
            </div>
          </div>
          <div class="text-center mt-6">
            <h3 class="text-md font-light mb-2">Monthly payment</h3>
            <p class="text-[32px] md:text-5xl font-normal mb-8 md:mb-4 font-bitter">
              {{ store.calculatedMonthlyPayment }}€
            </p>
            <BaseButton @click="openModal"> Apply now </BaseButton>
          </div>
          <p class="pb-8 text-xs text-gray-600 md:text-center">
            The calculation is approximate and may differ from the conditions offered to you. Please
            submit a loan application to receive a personal offer. Financial services are provided
            by AS Inbank Finance.
          </p>
        </div>
      </div>
    </div>
    <ModalForm v-if="isModalOpen" :isOpen="isModalOpen" @close="isModalOpen = false" />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useCalculatorStore } from '../stores/calculator';
import ModalForm from './ModalForm.vue';
import HeroCard from './HeroCard.vue';
import LogoComponent from './LogoComponent.vue';
import BaseButton from './BaseButton.vue';
import TextInput from './TextInput.vue';
import SelectInput from './SelectInput.vue';

const store = useCalculatorStore();

const isModalOpen = ref(false);
const calculatorSection = ref<HTMLElement | null>(null);

function scrollToCalculator() {
  calculatorSection.value?.scrollIntoView({ behavior: 'smooth' });
}

function openModal() {
  isModalOpen.value = true;
}

const periodOptions = Array.from({ length: 71 }, (_, i) => ({
  value: (i + 2).toString(),
  label: `${i + 2} months`,
}));

function updateRangeBackground(event: Event, type: 'amount' | 'period') {
  const input = event.target as HTMLInputElement;
  const min = parseInt(input.min);
  const max = parseInt(input.max);
  const value = parseInt(input.value);
  const percentage = ((value - min) / (max - min)) * 100;
  input.style.setProperty('--value', `${percentage}%`);
}

watch(
  () => store.amount,
  (newValue) => {
    const input = document.getElementById('amount-input') as HTMLInputElement;
    if (input) {
      const min = 300;
      const max = 7200;
      const percentage = ((Number(newValue) - min) / (max - min)) * 100;
      input.style.setProperty('--value', `${percentage}%`);
    }
  }
);

watch(
  () => store.period,
  (newValue) => {
    const input = document.getElementById('period-select') as HTMLInputElement;
    if (input) {
      const min = 2;
      const max = 72;
      const percentage = ((Number(newValue) - min) / (max - min)) * 100;
      input.style.setProperty('--value', `${percentage}%`);
    }
  }
);
</script>

<style scoped>
input[type='range']::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 52px;
  height: 36px;
  cursor: pointer;
  background: url('/assets/drag-button.svg') center/cover no-repeat;
  margin-top: -16px;
}

input[type='range']::-moz-range-thumb {
  width: 52px;
  height: 36px;
  cursor: pointer;
  background: url('/assets/drag-button.svg') center/cover no-repeat;
  transform: translateY(-16px);
}

input[type='range']::-webkit-slider-runnable-track {
  background: linear-gradient(
    to right,
    #21093a 0%,
    #21093a var(--value),
    rgba(33, 9, 58, 0.1) var(--value),
    rgba(33, 9, 58, 0.1) 100%
  );
  height: 4px;
  border-radius: 2px;
}

input[type='range']::-moz-range-track {
  background: linear-gradient(
    to right,
    #21093a 0%,
    #21093a var(--value),
    rgba(33, 9, 58, 0.1) var(--value),
    rgba(33, 9, 58, 0.1) 100%
  );
  height: 4px;
  border-radius: 2px;
}

@media (max-width: 768px) {
  .flex-col {
    flex-direction: column;
  }
  .space-y-4 > * {
    margin-bottom: 1rem;
  }
  .w-full {
    width: 100%;
  }
}
</style>
