import axios from 'axios'

export default {
  async listar ({ commit }) {
    try {
      const list = await axios.get('http://localhost:3002/users')

      commit('userList', list)
      return list.data
    } catch (error) {
      return error
    }
  }
}
