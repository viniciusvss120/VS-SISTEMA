<template>
 <div>
  <header>
    <Menu
      sigla="VSS"
    />
  </header>
  <main>
    <div
      class="modal"
      v-show="showModal"
    >
      <Modal
        @fecharModal="fecharModal(evento)"
        :acoesModal="acoesModal"
      />
    </div>
    <article class="filtro">
      <Filtro />
    </article>
    <Tabela
      :dados="items"
      @vizualizar="abrirModal"
      @editar="abrirModal"
    />
  </main>
  <router-view />
 </div>
</template>

<script>
import Menu from '../../components/Menu.vue'
import Filtro from '../../components/Filtro.vue'
import Tabela from '../../components/Tabela'
import Modal from '../../components/Modal'

import { mapActions, mapState } from 'vuex'
export default {
  name: 'theHome',
  components: {
    Menu,
    Filtro,
    Tabela,
    Modal
  },
  data () {
    return {
      headers: [
        {
          text: 'id',
          value: 'id',
          align: 'start',
          with: '10'
        },
        {
          text: 'Nome',
          value: 'nome',
          align: 'start'
        },
        {
          text: 'E-mail',
          value: 'email',
          align: 'start'
        },
        {
          text: 'Telefone',
          value: 'telefone',
          align: 'start'
        }
      ],
      items: [],
      showModal: false,
      acoesModal: {}
    }
  },
  created () {
    this.listUser()
  },
  computed: {
    ...mapState('users', ['users'])
  },
  methods: {
    ...mapActions('users', ['listar']),

    async listUser () {
      try {
        const list = await this.listar()
        console.log(list)
        this.items = list
      } catch (error) {
        console.error(error)
      }
    },
    fecharModal () {
      this.showModal = false
    },
    abrirModal (evento) {
      this.acoesModal = evento
      console.log(this.acoesModal)
      this.showModal = true
    }
  }
}
</script>

<style scoped>
  .filtro{
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  main{
    position: relative;
    height: 100vh;
  }
  .modal{
    border: 1px solid;
    position: fixed;
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, 0.4);
    z-index: 11;
    border: 1px solid;
  }
</style>
