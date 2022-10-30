import {
  createWebHistory,
  // createWebHashHistory,
  createRouter,
} from 'vue-router';

const routes = [
  {
    path: '/',
    component: () => import('../components/AppMain.vue'),
  },
  {
    path: '/:id',
    component: () => import('../components/AppContent.vue'),
  },
  {
    path: '/category/:categoryId',
    component: () => import('../components/AppCategory.vue'),
  },
  {
    path: '/search/:keyword',
    component: () => import('../components/AppSearch.vue'),
  },
  // {
  //   path: '/404',
  //   component: () => import('../components/404.vue'),
  // },
  {
    path: '/:pathMatch(.*)*',
    // redirect: '/404',
    component: () => import('../components/404.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  // history: createWebHashHistory(),
  routes,
});

export default router;
