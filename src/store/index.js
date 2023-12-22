import Vue from 'vue'
import Vuex from 'vuex'
import users from '../vuex/usuarios/index'
import produtos from '../vuex/produtos/index'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    users,
    produtos
  }
})
