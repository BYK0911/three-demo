import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/boot',
    component: () => import(/* webpackChunkName: "boot" */ '../views/Boot.vue')
  },
  {
    path: '/parametric',
    component: () => import(/* webpackChunkName: "parametric" */ '../views/parametricGeometry')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
