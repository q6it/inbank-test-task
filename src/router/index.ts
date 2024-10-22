import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import SuccessView from '../views/SuccessView.vue';
import DeclineView from '../views/DeclineView.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  { path: '/success', name: 'Success', component: SuccessView },
  { path: '/decline', name: 'Decline', component: DeclineView },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
