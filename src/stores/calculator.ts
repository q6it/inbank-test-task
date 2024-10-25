import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useCalculatorStore = defineStore('calculator', () => {
  const amount = ref(500);
  const period = ref(24);
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
    const annualInterestRatePercentage = 3.476;
    const annualInterestRate = annualInterestRatePercentage / 100;
    const monthlyInterestRate = annualInterestRate / 12;
    const numberOfPayments = period.value;

    if (monthlyInterestRate === 0) {
      return (amount.value / numberOfPayments).toFixed(2);
    }

    const payment =
      (amount.value * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
      (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);

    console.log('🚀 ~ calculatedMonthlyPayment ~ payment:', payment);
    return payment.toFixed(2);
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
