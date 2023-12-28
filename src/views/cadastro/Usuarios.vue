<template>
 <div>
  <Menu2
    :sigla="sigla"
  />

  <section class="navigation">
    <MenuVertical />
    <!-- <div class="navigation-drawer">
      <div
        class="menuContainer usuarios"
      >
        <div class="menuLabel"
          @click="() => showUsuarios = !showUsuarios"
        >
          <v-icon>
            mdi-account
          </v-icon>
          <span
          >
            Usuarios
          </span>
        </div>
        <ul v-show="showUsuarios">
          <li
            class="menus"
          >
            <v-icon>
              mdi-account-edit
            </v-icon>
            <router-link
              to="/usuarios"
            >
              Consultar/Editar
            </router-link>
          </li>
          <li
            class="menus"
          >
            <v-icon>
              mdi-account-multiple
            </v-icon>
            <router-link
              to="/criarusuario"
            >
              Cadastrar
            </router-link>
          </li>
        </ul>
      </div>

      <div class="menuContainer chamados"
      >
        <div class="menuLabel"
          @click="() => showChamados = !showChamados"
        >
          <v-icon>
            mdi-pencil
          </v-icon>
          <span
          >
            Chamados
          </span>
        </div>
        <ul v-show="showChamados">
          <li
            class="menus"
          >
            <router-link
              to="/chamados"
            >
              Meus chamados
            </router-link>
          </li>
        </ul>
      </div>
    </div> -->
   <router-view />
  </section>
 </div>
</template>

<script>
import MenuVertical from '@/components/MenuVertical.vue'
import Menu2 from '../../components/Menu2'
// import { mapState } from 'vuex'
export default {
  name: 'theHome',
  components: {
    Menu2,
    MenuVertical
  },
  data () {
    return {
      showModal: false,
      showUsuarios: false,
      showChamados: false,
      acoesModal: {}
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
</style>
