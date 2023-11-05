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
  }
}
