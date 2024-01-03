<template>
  <div>
    <Menu2
      :sigla="sigla"
      v-show="false"
    />
    <section  ref="section">
      <MenuVertical v-show="false" />
      <router-view/>
    </section>
  </div>
</template>

<script>
import MenuVertical from '@/components/MenuVertical.vue'
import Menu2 from '@/components/Menu2'
export default {
  name: 'theVendas',
  components: {
    MenuVertical,
    Menu2
  },
  data () {
    return {
      classLayout: 'layout'
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
  },

  created () {
    // if (window.location.pathname === '/vendas/vendasdireta') {
    //   const section = this.$refs

    //   section.clessList.remove('navigation')
    //   section.clessList.add(this.classLayout)
    //   console.log(section)
    // }
  }
}
</script>

<style scoped>

</style>
