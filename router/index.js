import { createWebHistory, createRouter } from 'vue-router';

const routes = [
  {
    path: '/',
    component: () => import('../components/AppMain.vue'),
  },
  // {
  //   path: '/:id',
  //   component: () => import('../components/AppContent.vue'),
  // },
  {
    path: '/category/:categoryId',
    component: () => import('../components/AppCategory.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
