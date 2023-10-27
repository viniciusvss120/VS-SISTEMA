<template>
 <div class="container">
  <main>
    <div
      class="modal"
      v-show="showModal"
    >
      <Modal
        @fecharModal="fecharModal(evento)"
        @salvar="editUser"
        :acoesModal="acoesModal"
      >
        <v-card-text v-show="acoesModal.editar" >
          <v-text-field
            label="Nome"
            v-model="acoesModal.name"
            clearable
            :hint="msg"
          />
          <v-text-field
           label="Email"
           type="email"
           v-model="acoesModal.email"
           placeholder="usuario@gmail.com"
           :hint="msg"
           clearable
          />
          <v-text-field
            label="CNPJ"
            v-model="acoesModal.cnpj"
            clearable
          />
          <v-text-field
            label="Perfil"
            v-model="acoesModal.perfil"
            clearable
          />
          <!-- <v-text-field label="Senha"></v-text-field> -->
      </v-card-text>
      </Modal>
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
 </div>
</template>

<script>
import Filtro from '../../components/Filtro.vue'
import Tabela from '../../components/Tabela'
import Modal from '../../components/Modal'

import { mapActions, mapState } from 'vuex'
export default {
  name: 'theControleUsers',
  components: {
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
      acoesModal: {},
      msg: 'Campo obrigatório'
    }
  },
  created () {
    this.listUser()
  },
  computed: {
    ...mapState('users', ['users'])
  },
  methods: {
    ...mapActions('users', ['listar', 'editar']),

    async listUser () {
      try {
        const list = await this.listar()
        console.log(list)
        this.items = list
      } catch (error) {
        console.error(error)
      }
    },

    async editUser () {
      try {
        const result = await this.editar(this.acoesModal)
        console.log(result)
      } catch (error) {
        console.error(error)
      }
      console.log(this.acoesModal)
    },
    fecharModal () {
      this.showModal = false
    },
    abrirModal (evento) {
      this.acoesModal = evento
      this.showModal = true
    }
  }
}
</script>

<style scoped>
  /* .container{
    overflow-y: scroll !important;
  } */
  .filtro{
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  main{
    position: relative;
    overflow-y: scroll;
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
