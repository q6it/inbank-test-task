import { createRouter, createWebHistory } from 'vue-router';
import CalculatorComponent from '../components/CalculatorComponent.vue';
import ConfirmationView from '../views/ConfirmationView.vue';
import DeclineView from '../views/DeclineView.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: CalculatorComponent,
  },
  { path: '/confirmation', name: 'confirmation', component: ConfirmationView },
  { path: '/decline', name: 'Decline', component: DeclineView },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
