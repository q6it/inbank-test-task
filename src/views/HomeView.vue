<template>
  <div class="flex flex-col justify-left px-10 py-6 md:px-10 md:py-6">
    <img
      alt="Vue logo"
      src="../assets/inbank-logo.svg"
      class="w-[113px] h-[40px] md:w-[182px] md:h-[64px]"
    />
  </div>
  <CalculatorComponent />
</template>

<script lang="ts">
import CalculatorComponent from '@/components/CalculatorComponent.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HomeView',
  components: {
    CalculatorComponent,
  },
});
</script>
