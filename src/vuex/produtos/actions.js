import axios from 'axios'

export default {
  async cadastrar ({ commit }, data) {
    try {
      const result = await axios.post('http://localhost:3002/createprod', data)

      return result
    } catch (error) {
      return error
    }
  }
}
