import axios from 'axios'

export default {
  async criar ({ commit }, data) {
    try {
      const result = await axios.post('http://localhost:3002/users', data)
      commit('criarUser', result)
      return result
    } catch (error) {
      return error
    }
  },
  async listar ({ commit }) {
    try {
      const list = await axios.get('http://localhost:3002/users?')
      commit('userList', list)
      return list.data
    } catch (error) {
      return error
    }
  },

  async editar ({ commit }, data) {
    try {
      const edit = await axios.put('http://localhost:3002/users/' + data.id, data)
      console.log(edit)
      return edit
    } catch (error) {
      return error
    }
  },
  async deletar ({ commit }, data) {
    try {
      const delet = await axios.delete('http://localhost:3002/users/' + data.id)
      return delet
    } catch (error) {
      return error
    }
  },

  async filtro ({ commit }, data) {
    try {
      const result = await axios.post('http://localhost:3002/filter', data)

      return result.data
    } catch (error) {
      console.error(error)
    }
  },

  // Recuperar Senha

  async envioCpfCnpj ({ commit }, data) {
    try {
      const result = await axios.post('http://localhost:3002/recuperarsenha', data)
      return result
    } catch (error) {
      return error
    }
  },

  async verificarCodToken ({ commit }, data) {
    try {
      const result = await axios.post('http://localhost:3002/verificarcodtoken', data)
      return result
    } catch (error) {
      return error
    }
  },
  async updateSenha ({ commit }, data) {
    try {
      console.log(data)
      const result = await axios.put('http://localhost:3002/recuperarsenha', data)
      return result
    } catch (error) {
      return error
    }
  }
}
