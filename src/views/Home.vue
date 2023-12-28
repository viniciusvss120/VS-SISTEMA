<template>
  <div>
    <Menu2
      :sigla="sigla"
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
export default {
  name: 'theInicial',
  components: {
    Menu2,
    MenuVertical
  },
  data () {
    return {
      showMenu: true
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

  .navigation img {
    max-width: 55%;
    justify-self: center;
    align-self: center;
  }
</style>
