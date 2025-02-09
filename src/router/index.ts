import {createRouter, createWebHistory} from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/self',
            name: 'self',
            component: () => import('../views/SelfView.vue')
        },
        {
            path: '/grid',
            name: 'grid',
            component: () => import('../views/GridView.vue')
        }
    ]
})

export default router
