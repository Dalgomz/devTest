import MainView from '@/views/MainView.vue'
import ProductDetails from '@/views/ProductDetails.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:pathMatch(.*)*',
      redirect: { name: "main" },
    },
    {
      path: '/',
      name: 'main',
      component: MainView,
    },
    {
      path: '/details/:id',
      name: 'details',
      component: ProductDetails,
    },
  ],
})

export default router
