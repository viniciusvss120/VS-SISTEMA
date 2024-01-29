import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'

import Usuarios from '../views/cadastro/Usuarios.vue'
import RecuperarSenha from '../views/RecuperarSenha.vue'
import ControleUsers from '../views/cadastro/Controle_Users.vue'
import CriarUsuario from '../views/cadastro/Criar_Usuario'

// import Error from '../views/Error'

import Vendas from '../views/vendas/Vendas.vue'
import VendasDireta from '../views/vendas/Vendas_direta.vue'

import Produtos from '../views/cadastro/Produtos'
import Login from '../views/Login'
import Home from '../views/Home'
// import { from } from 'core-js/core/array'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'theHome',
    meta: { requiresAuth: true },
    component: Home
  },
  {
    path: '/cadastro',
    component: Usuarios,
    meta: { requiresAuth: true }, // Esta rota requer autenticação
    children: [
      {
        path: '/cadastro/usuarios',
        name: 'theControleUsers',
        component: ControleUsers
      },
      {
        path: '/cadastro/criarusuario',
        name: 'Criar_Usuario',
        component: CriarUsuario
      },
      {
        path: '/cadastro/produtos',
        name: 'Produtos',
        component: Produtos
      }
    ]
  },
  {
    path: '/vendas',
    name: 'theVendas',
    component: Vendas,
    meta: { requiresAuth: true }, // Esta rota requer autenticação
    children: [
      {
        path: '/vendas/vendasdireta',
        name: 'theVendasDireta',
        component: VendasDireta
      }
    ]
  },
  {
    path: '/login',
    name: 'theLogin',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Login
  },
  {
    path: '/recuperarsenha',
    name: 'theRecuperarSenha',
    component: RecuperarSenha
  }
]
// const rotaLogin = [
//   {
//     path: '/login',
//     name: 'theLogin',
//     // route level code-splitting
//     // this generates a separate chunk (about.[hash].js) for this route
//     // which is lazy-loaded when the route is visited.
//     component: Login
//   },
//   {
//     path: '/recuperarsenha',
//     name: 'theRecuperarSenha',
//     component: RecuperarSenha
//   }
// ]
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(async (to, from, next) => {
  if (to.matched.some(result => result.meta.requiresAuth)) {
    const login = window.localStorage.getItem('token')

    if (!login) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      try {
        const result = await axios.post('http://localhost:3002/validarToken', { token: window.localStorage.getItem('token') })
        const validateUser = result.data
        if (validateUser) {
          next()
        } else {
          next({
            path: '/login',
            query: { redirect: to.fullPath }
          })
        }
      } catch (error) {
        console.error(error)
      }
    }
  } else {
    next()
  }
})

export default router
