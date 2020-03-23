import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

import feedback from '../views/feedback.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
    {
        path: '/feedback',
        name: 'feedback',
        component: feedback
    }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
