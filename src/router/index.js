import Vue from 'vue'
import VueRouter from 'vue-router'

import Usuarios from '../views/cadastro/Usuarios.vue'
import RecuperarSenha from '../views/RecuperarSenha.vue'
import ControleUsers from '../views/cadastro/Controle_Users.vue'
import CriarUsuario from '../views/cadastro/Criar_Usuario'

import Vendas from '../views/vendas/Vendas.vue'
import VendasDireta from '../views/vendas/Vendas_direta.vue'

import Produtos from '../views/cadastro/Produtos'
import Login from '../views/Login'
import Home from '../views/Home'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'theHome',
    component: Home
  },
  {
    path: '/cadastro',
    component: Usuarios,
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

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
