<template>
 <div>
  <Menu2
    :sigla="sigla"
  />

  <section class="navigation">
    <div class="navigation-drawer">
      <ul>
        <li class="menus">
          <router-link
            to="/usuarios"
          >
            Usuários
          </router-link>
        </li>
      </ul>
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
      items: [],
      showModal: false,
      acoesModal: {}
    }
  },
  computed: {

    sigla () {
      const userName = window.localStorage.getItem('nameUser')
      const siglaUser = userName.slice(0, 2).toLocaleUpperCase()
      return siglaUser
    }
  }
}
</script>

<style scoped>

  li,a{
    text-decoration: none;
    color: #000;
    padding: 0px;
    margin: 0px;
  }
  /* .filtro{
    display: flex;
    justify-content: space-around;
    align-items: center;
  } */

  /* main{
 }    position: relative;
    height: 100vh; */

  .modal{
    border: 1px solid;
    position: fixed;
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, 0.4);
    z-index: 11;
    border: 1px solid;
  }

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
  .menus{
    border-left: 3px solid;
    margin: 15px auto 10px 5px;
    box-shadow: 0px 0px 20px 1px #DCDCDC;
    padding: 10px;
  }
  .menus:hover{
    padding: 12px;
    /* transition: ; */
  }

  .menus a {
    padding: 10px 60% 10px 10px;
    text-align: start;
    font-size: 1.2rem;
    font-weight: 600;
    cursor: pointer
  }
  .menus:hover{
    background: #f6f6f6;
  }
</style>
