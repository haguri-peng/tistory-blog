import { createWebHistory, createRouter } from 'vue-router';

const routes = [
  {
    path: '/',
    component: () => import('../components/AppMain.vue'),
  },
  {
    path: '/category/:menuNm',
    component: () => import('../components/AppCategory.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
