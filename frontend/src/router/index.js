import { createRouter, createWebHistory } from 'vue-router'
import AppLayout from '@/components/AppLayout.vue'
import Dashboard from '../views/Dashboard.vue'
import Login from '@/views/Login.vue'
import RequestPassword from '@/views/RequestPassword.vue'
import ResetPassword from '@/views/ResetPassword.vue'
import Product from '@/views/Product.vue'
import NotFound from '@/views/NotFound.vue'
import {useSessionStore} from '@/store/useSessionStore.js'



const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/app',
            name: 'app',
            component: AppLayout,
            meta: {
                requiresAuth: true
            },
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
            component: Login,
            meta: {
                requiresGuest: true,
            }
        },
        {
            path: '/request-password',
            name: 'request.password',
            component: RequestPassword,
            meta: {
                requiresGuest: true,
            }
        },
        {
            path: '/reset-password/token',
            name: 'reset.password',
            component: ResetPassword,
            meta: {
                requiresGuest: true,
            }
        },
        {
            path: '/:pathMatch(.*)',
            name: 'not-found',
            component: NotFound,
        }
    ]
})

router.beforeEach((to, from, next) => {
    const session = useSessionStore();

    if (to.meta.requiresAuth && !session.user.token) {
        next({ name: 'login' })
    } else if(to.meta.requiresGuest && session.user.token){
        next({ name: 'app.dashboard' });
    }else {
        next();
    }
})

export default router
