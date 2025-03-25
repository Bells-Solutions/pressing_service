import { nextTick } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { useAppStore } from '@/stores/appStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/pages/HomePage.vue'),
      meta: {
        title: 'Home',
      },
    },
    {
      path: '/orders',
      name: 'orders',
      component: () => import('@/pages/OrdersPage.vue'),
      meta: {
        title: 'Orders',
      },
    },
    {
      path: '/privacy-policy',
      name: 'privacy-policy',
      component: () => import('@/pages/PrivacyPolicyPage.vue'),
      meta: {
        title: 'Privacy Policy',
      },
    },
    {
      path: '/terms-and-conditions',
      name: 'terms-and-conditions',
      component: () => import('@/pages/PrivacyPolicyPage.vue'),
      meta: {
        title: 'Terms and Conditions',
      },
    },
  ],
})

router.afterEach((to) => {
  // We handle posts in their own component
  if (to.name == 'post') return

  nextTick(() => {
    const appStore = useAppStore()

    document.title = to.meta.title ? `${to.meta.title} - ${appStore.appName}` : appStore.appName
  })
})

export default router
