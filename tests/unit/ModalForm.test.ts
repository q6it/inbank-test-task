import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import ModalForm from '@/components/ModalForm.vue';
import { useCalculatorStore } from '@/stores/calculator';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

// Mock router
const routes: RouteRecordRaw[] = [
  {
    path: '/confirmation',
    name: 'Confirmation',
    component: { template: '<div>Confirmation</div>' },
  },
  { path: '/decline', name: 'Decline', component: { template: '<div>Decline</div>' } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Mock vee-validate
vi.mock('vee-validate', async () => {
  const actual = await vi.importActual('vee-validate');
  return {
    ...(actual as object),
    useForm: vi.fn().mockReturnValue({
      handleSubmit: vi.fn((callback) => async () => {
        const result = await callback({
          firstName: 'Jane',
          lastName: 'Doe',
          mobileNumber: '551234567',
          email: 'jane@example.com',
          monthlyIncome: 900,
        });
        return result;
      }),
      validate: vi.fn().mockResolvedValue({ valid: true, errors: {} }),
    }),
  };
});

describe('ModalForm', () => {
  let wrapper: any;
  let store: any;

  beforeEach(() => {
    const pinia = createTestingPinia({
      createSpy: vi.fn,
      initialState: {
        calculator: {
          firstName: '',
          lastName: '',
          mobileNumber: '',
          email: '',
          monthlyIncome: 0,
        },
      },
    });

    wrapper = mount(ModalForm, {
      global: {
        plugins: [pinia, router],
        stubs: {
          TextInput: {
            template:
              '<input :value="modelValue" @input="$emit(\'update:modelValue\', $event.target.value)" />',
            props: ['modelValue'],
          },
          BaseButton: true,
        },
      },
    });
    store = useCalculatorStore();
  });

  it('renders correctly', () => {
    expect(wrapper.find('h2').text()).toBe('Personal details');
  });

  it('submits form with valid data and income > 1000', async () => {
    const pushSpy = vi.spyOn(router, 'push');

    await wrapper.find('form').trigger('submit');
    await flushPromises();

    expect(store.$patch).toHaveBeenCalledWith(
      expect.objectContaining({
        firstName: 'Jane',
        lastName: 'Doe',
        mobileNumber: '551234567',
        email: 'jane@example.com',
        monthlyIncome: 900,
      })
    );

    expect(pushSpy).toHaveBeenCalledWith('/decline');
  });

  it('emits close event when close button is clicked', async () => {
    await wrapper.find('button').trigger('click');
    expect(wrapper.emitted('close')).toBeTruthy();
  });
});
