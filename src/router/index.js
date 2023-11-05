import Vue from 'vue'
import VueRouter from 'vue-router'
import Usuarios from '../views/usuarios/Usuarios.vue'
import ControleUsers from '../views/usuarios/Controle_Users.vue'
import CriarUsuario from '../views/usuarios/Criar_Usuario'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Usuarios,
    children: [
      {
        path: '/usuarios',
        name: 'theControleUsers',
        component: ControleUsers
      },
      {
        path: '/usuarios/criar',
        name: 'Criar_Usuario',
        component: CriarUsuario
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
