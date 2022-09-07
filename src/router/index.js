import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/views/Home.vue')
    },
    {
      path: '/note/:id',
      name: 'ViewNote',
      component: () => import('@/views/ViewNote.vue'),
      props: true
    },
    {
      path: '/edit/:id',
      name: 'EditNote',
      component: () => import('@/views/EditNote.vue'),
      props: true
    },
    {
      path: '/about',
      name: 'About',
      component: () => import( '@/views/About.vue')
    },
    {
      path: '/create',
      name: 'create',
      component: () => import('@/views/CreateNote.vue')
    },
    {
      path: '/:catchAll',
      redirect: '/'
    }
  ]
})

export default router
