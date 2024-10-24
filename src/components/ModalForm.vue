<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
    <div class="bg-white rounded-3xl w-full max-w-md relative my-8">
      <button
        @click="$emit('close')"
        class="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      <h2 class="text-xl font-semibold mb-4 pt-6 px-6">Personal details</h2>

      <Form
        :validation-schema="validationSchema"
        @submit.prevent="onSubmit"
        class="p-6 pt-0 space-y-4"
      >
        <Field name="firstName" v-slot="{ field, errorMessage, meta }">
          <TextInput
            id="firstName"
            :fullWidth="true"
            label="First name"
            v-bind="field"
            :modelValue="field.value"
            @update:modelValue="field.onChange"
            :isActive="meta.touched"
            :isError="!!errorMessage"
            :supportingText="errorMessage || 'Enter your first name'"
          />
        </Field>

        <Field name="lastName" v-slot="{ field, errorMessage, meta }">
          <TextInput
            id="lastName"
            :fullWidth="true"
            label="Last name"
            v-bind="field"
            :modelValue="field.value"
            @update:modelValue="field.onChange"
            :isActive="meta.touched"
            :isError="!!errorMessage"
            :supportingText="errorMessage || 'Enter your last name'"
          />
        </Field>

        <Field name="mobileNumber" v-slot="{ field, errorMessage, meta }">
          <TextInput
            id="mobileNumber"
            :fullWidth="true"
            label="Mobile number"
            type="tel"
            v-bind="field"
            :modelValue="field.value"
            @update:modelValue="field.onChange"
            :isActive="meta.touched"
            :isError="!!errorMessage"
            :supportingText="errorMessage || 'Enter your mobile number'"
          />
        </Field>

        <Field name="email" v-slot="{ field, errorMessage, meta }">
          <TextInput
            id="email"
            :fullWidth="true"
            label="E-mail"
            type="email"
            v-bind="field"
            :modelValue="field.value"
            @update:modelValue="field.onChange"
            :isActive="meta.touched"
            :isError="!!errorMessage"
            :supportingText="errorMessage || 'Enter your email address'"
          />
        </Field>

        <Field name="monthlyIncome" v-slot="{ field, errorMessage, meta }">
          <TextInput
            id="monthlyIncome"
            :fullWidth="true"
            label="Monthly income"
            type="number"
            v-bind="field"
            :modelValue="field.value"
            @update:modelValue="field.onChange"
            :isActive="meta.touched"
            :isError="!!errorMessage"
            :supportingText="errorMessage || 'Enter your monthly income'"
          />
        </Field>
        <BaseButton type="submit" class="mt-6" width="full">Submit</BaseButton>
      </Form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCalculatorStore } from '../stores/calculator';
import { useForm, Field } from 'vee-validate';
import * as Yup from 'yup';
import { defineProps, defineEmits } from 'vue';
import { useRouter } from 'vue-router';
import TextInput from './TextInput.vue';
import BaseButton from './BaseButton.vue';

defineProps({
  isOpen: Boolean,
});

const emit = defineEmits(['close']);

const router = useRouter();

const validationSchema = Yup.object({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  mobileNumber: Yup.string()
    .matches(/^55\d{5,6}$/, 'Mobile number must start with 55 and have 7-6 digits in total')
    .required('Mobile number is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  monthlyIncome: Yup.number()
    .min(100, 'Monthly income must be more than 100')
    .required('Monthly income is required'),
});

const { handleSubmit, validate } = useForm({
  validationSchema,
});

const store = useCalculatorStore();

const onSubmit = async () => {
  const { valid, errors } = await validate();

  if (!valid) {
    console.log('Form validation failed:', errors);
    return;
  }

  const values = await handleSubmit((values) => values)();

  if (values) {
    store.$patch(values);

    if (store.monthlyIncome > 1000) {
      emit('close');
      router.push('/confirmation');
    } else {
      emit('close');
      router.push('/decline');
    }
  }
};
</script>

<style scoped>
@media (max-width: 640px) {
  .fixed {
    align-items: flex-end;
  }
  .bg-white {
    border-radius: 1.5rem;
    margin-bottom: 2rem;
  }
}
</style>
