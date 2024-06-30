import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/row',
      name: 'row',
      component: ()=>import('../views/RowView.vue')
    },
    {
      path: '/grid',
      name: 'grid',
      component: () => import('../views/GridView.vue')
    }
  ]
})

export default router
