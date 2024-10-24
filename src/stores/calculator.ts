import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useCalculatorStore = defineStore('calculator', () => {
  const amount = ref('500');
  const period = ref('48');
  const firstName = ref('');
  const lastName = ref('');
  const mobilePhone = ref('');
  const email = ref('');
  const monthlyIncome = ref(0);

  const calculatedAmount = computed(() => {
    return amount.value;
  });

  const calculatedPeriod = computed(() => {
    return period.value;
  });

  const calculatedMonthlyPayment = computed(() => {
    const rate = 3.476;
    const monthlyRate = rate / 12;
    const numberOfPayments = period.value;
    const payment =
      (Number(amount.value) * monthlyRate * Math.pow(1 + monthlyRate, Number(numberOfPayments))) /
      (Math.pow(1 + monthlyRate, Number(numberOfPayments)) - 1);

    return parseFloat(payment.toFixed(2));
  });

  return {
    amount,
    period,
    firstName,
    lastName,
    mobilePhone,
    email,
    monthlyIncome,
    calculatedAmount,
    calculatedPeriod,
    calculatedMonthlyPayment,
  };
});
