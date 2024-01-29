import axios from 'axios'

export default {
  async vendaFinalizar ({ commit }, data) {
    try {
      const result = await axios.post('http://localhost:3002/vendas', data)
      console.log(result)
      return result
    } catch (error) {
      return error
    }
  },

  async listar ({ commit }, data) {
    try {
      const result = await axios.post('http://localhost:3002/listprod/', data)
      if (data !== null || data !== '') {
        commit('listProd', result.data)
      }
      return result.data[0]
    } catch (error) {
      return error
    }
  }
}
