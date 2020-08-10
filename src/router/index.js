import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    redirect: { path: '/' }
  },
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
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
