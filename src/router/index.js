import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/usuarios/HomeView.vue'
import ControleUsers from '../views/usuarios/Controle_Users.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/usuarios',
    component: HomeView,
    children: [
      {
        path: '/usuarios/controleusers',
        name: 'theControleUsers',
        component: ControleUsers
      }
    ]
  },
  {
    path: '/login',
    name: 'theLogin',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
