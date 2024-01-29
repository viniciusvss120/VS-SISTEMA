<template>
  <div v-show="showHome" class="homeContainer">
    <Menu2
      :sigla="sigla"
      class="menu2"
    />
    <section class="navigation">
      <MenuVertical
        v-show="showMenu"
      />
      <img src="./img/image 1.png" alt="Logo">
    </section>
  </div>
</template>
<script>
import MenuVertical from '@/components/MenuVertical.vue'
import Menu2 from '@/components/Menu2'
import axios from 'axios'
export default {
  name: 'theInicial',
  components: {
    Menu2,
    MenuVertical
  },
  data () {
    return {
      showHome: false,
      showMenu: true
    }
  },
  async beforeCreate () {
    try {
      const result = await axios.post('http://localhost:3002/validarToken', { token: window.localStorage.getItem('token') })
      const validateUser = result.data
      this.showHome = validateUser
      console.log(result.data)
    } catch (error) {
      console.error(error)
    }
  },
  computed: {
    sigla () {
      const userName = window.localStorage.getItem('nameUser')
      const regexName = /[A-Z]/g
      const siglaUser = regexName.exec(userName) + regexName.exec(userName)
      console.log(siglaUser)
      // .slice(0, 2).toLocaleUpperCase()
      return siglaUser
    }
  }
}
</script>

<style scoped>
  .homeContainer{
    position: relative;
  }
  .menu2 {
    /* position: absolute; */
    z-index: 80;
  }
  .navigation img {
    max-width: 55%;
    justify-self: center;
    align-self: center;
  }
</style>
