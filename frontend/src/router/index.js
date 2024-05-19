import { createRouter, createWebHistory } from 'vue-router'
import AppLayout from '@/components/AppLayout.vue'
import Dashboard from '../views/Dashboard.vue'
import Login from '@/views/Login.vue'
import RequestPassword from '@/views/RequestPassword.vue'
import ResetPassword from '@/views/ResetPassword.vue'
import Product from '@/views/Product.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
        path: '/app',
        name: 'app',
        component: AppLayout,
        children: [
          {
            path: 'dashboard',
            name: 'app.dashboard',
            component: Dashboard
          },
          {
            path: 'products',
            name: 'app.products',
            component: Product
          }
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/request-password',
        name: 'request.password',
        component: RequestPassword,
    },
    {
        path: '/reset-password/token',
        name: 'reset.password',
        component: ResetPassword,
    }
  ]
})

export default router
