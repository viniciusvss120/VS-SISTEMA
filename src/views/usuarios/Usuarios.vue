<template>
 <div>
  <Menu2
    :sigla="sigla"
  />

  <section class="navigation">
    <div class="navigation-drawer">
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
          <!-- <v-icon>
            mdi-menu-down
          </v-icon> -->
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
          <!-- <v-icon>
            mdi-menu-down
          </v-icon> -->
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
    </div>
   <router-view />
  </section>
 </div>
</template>

<script>
import Menu2 from '../../components/Menu2'
// import { mapState } from 'vuex'
export default {
  name: 'theHome',
  components: {
    Menu2
  },
  data () {
    return {
      items: [
        {
          id: 1,
          name: 'Usuarios',
          children: [
            { id: 2, name: 'Calendar' },
            { id: 3, name: 'Chrome : app' },
            { id: 4, name: 'Webstorm : app' }
          ]
        }
      ],
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

  li,a{
    text-decoration: none;
    color: #000000DE;
    font-weight: 400;
    padding: 0px;
    margin: 0px;
  }

  /* .modal{
    border: 1px solid;
    position: fixed;
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, 0.4);
    z-index: 11;
    border: 1px solid;
  } */

  .navigation{
    display: grid;
    grid-template-columns: 250px 1fr;
    max-height: 100vh !important;
    /* border: 1px solid; */

  }
  .navigation-drawer{
    box-shadow: 0px 0px 20px 1px #DCDCDC;
    height: 600px;
  }
  .navigation-drawer ul {
    width: 90%;
  }

  .menuContainer {
    margin: 15px auto 25px 15px;
    cursor: pointer;
  }
  .menuLabel {
    display: flex;
    gap: 8px;
  }
  .menuLabel span {
    font-size: 1.2rem;
    color: #000;
  }
  .menus{
    margin: 5px 0px 5px 30px;
    padding: 5px;
  }
  /* .menus:hover{
    padding: 12px;
  } */

  .menus a {
    /* padding: 10px 60% 10px 0px; */
    text-align: start;
    font-size: 1rem;
    color: #000000DE;
    font-weight: 400;
    cursor: pointer
  }
  .menus:hover{
    background: #f6f6f6;
  }
</style>
