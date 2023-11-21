import Vue from 'vue'
import VueRouter from 'vue-router'
import Usuarios from '../views/usuarios/Usuarios.vue'
import RecuperarSenha from '../views/RecuperarSenha.vue'
import ControleUsers from '../views/usuarios/Controle_Users.vue'
import CriarUsuario from '../views/Criar_Usuario'
import Inicial from '../views/usuarios/Inicial'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Usuarios,
    children: [
      {
        path: '/',
        name: 'theInicial',
        component: Inicial
      },
      {
        path: '/usuarios',
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
  },
  {
    path: '/criarusuario',
    name: 'Criar_Usuario',
    component: CriarUsuario
  },
  {
    path: '/recuperarsenha',
    name: 'theRecuperarSenha',
    component: RecuperarSenha
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
