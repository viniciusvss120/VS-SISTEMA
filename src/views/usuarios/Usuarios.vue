<template>
 <div class="">
  <Menu2
    sigla="VSS"
  />

  <section class="navigation">
    <div class="navigation-drawer">
      <ul>
        <li>Usuários</li>
      </ul>
    </div>
   <router-view />
  </section>
 </div>
</template>

<script>
import Menu2 from '../../components/Menu2'
// import { mapActions, mapState } from 'vuex'
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
  }
  // created () {
  //   this.listUser()
  // },
  // computed: {
  //   ...mapState('users', ['users'])
  // },
  // methods: {
  //   ...mapActions('users', ['listar']),

  //   async listUser () {
  //     try {
  //       const list = await this.listar()
  //       console.log(list)
  //       this.items = list
  //     } catch (error) {
  //       console.error(error)
  //     }
  //   },
  //   fecharModal () {
  //     this.showModal = false
  //   },
  //   abrirModal (evento) {
  //     this.acoesModal = evento
  //     console.log(this.acoesModal)
  //     this.showModal = true
  //   }
  // }
}
</script>

<style scoped>
  li,a{
    text-decoration: none;
    padding: 0px;
    margin: 0px;
  }
  .filtro{
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

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
    max-height: 700px !important;
    /* border: 1px solid; */

  }
  .navigation-drawer{
    border: 1px solid;
    height: 622px;
  }
</style>
