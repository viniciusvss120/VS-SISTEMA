<template>
 <div class="main">
  <main>
    <div
      class="modal"
      v-show="true"
    >
    </div>
    <Modal2
      :class="showModal"
      @fecharModal="fecharModal"
      @salvar="editUser"
      :acoesModal="acoesModal"
    >
      <v-card-text v-show="acoesModal.editar" >
          <div class="field">
            <label class="label">Name</label>
            <div class="control">
              <input
                class="input"
                type="text"
                v-model="acoesModal.name"
                placeholder="Nome"
              >
            </div>
          </div>
          <div class="field">
          <label class="label">Email</label>
          <div class="control">
            <input
              class="input"
              type="email"
              v-model="acoesModal.email"
              placeholder="usuario@gmail.com"
              >
          </div>
        </div>
        <div class="field">
          <label class="label">CPF/CNPJ</label>
          <div class="control">
            <input
              class="input"
              type="text"
              v-model="acoesModal.cpf_cnpj"
              placeholder="00.000.000/0001-00"
              >
          </div>
        </div>
        <div class="field">
          <label class="label">Perfil</label>
          <div class="control">
            <input
              class="input"
              type="text"
              v-model="acoesModal.perfil"
            >
          </div>
        </div>
      </v-card-text>
    </Modal2>
    <article
      class="filtro"
      v-if="loading === false"
    >
      <Filtro>
        <div class="filtroContainer">
          <v-form class="filtro-form">
            <div class="select is-medium filtro-exe">
              <span class="icon-text">
                <span class="icon is-medium">
                  <i class="fas fa-arrow-right"></i>
                </span>
              </span>
              <select
                v-model="filter.name"
              >
                <option
                 v-for="item in names"
                 :key="item"
                 class="options"
                 @click="filtroUser"
                >
                  {{item}}
                </option>
              </select>
            </div>
            <v-btn
              elevation="2"
              large
              x-large
              class="is-primary"
              @click="filtroUser"
            >Buscar</v-btn>
          </v-form>
        </div>
      </Filtro>
    </article>
    <Loading
      v-show="loading"
    />
    <Tabela
      v-if="loading === false"
      :dados="showUsers"
      @vizualizar="abrirModal"
      @editar="abrirModal"
    />
    <v-pagination
      class="paginacao"
      v-if="loading === false"
      v-model="page"
      :length="qtdPaginas"
      @next="listUser"
      @previous="listUser"
      navigation-text-color
      prev-icon="mdi-menu-left"
      next-icon="mdi-menu-right"
    ></v-pagination>

  </main>
 </div>
</template>

<script>
import Filtro from '../../components/Filtro.vue'
import Tabela from '../../components/Tabela'
// import Modal from '@/components/Modal.vue'
import Modal2 from '@/components/Modal2.vue'
import Loading from '@/components/Loading.vue'

import { mapActions, mapState } from 'vuex'
export default {
  name: 'theControleUsers',
  components: {
    Filtro,
    Tabela,
    Modal2,
    Loading
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
      itensTotal: [],
      filter: {
        name: '',
        cnpj: ''
      },
      selectUser: [],
      showModal: '',
      acoesModal: {},
      msg: 'Campo obrigatório',
      page: 1,
      qtdPaginas: 2,
      loading: false
    }
  },
  // beforeCreated () {
  //   this.loading = true
  // },
  async created () {
    this.loading = true
    await this.listUser()
    this.loading = false
  },
  computed: {
    ...mapState('users', ['users']),
    showUsers () {
      return this.selectUser.length === 0 ? this.items : this.selectUser
    },
    names () {
      const name = this.itensTotal.map(item => item.name)
      return name
    }
  },
  methods: {
    ...mapActions('users', ['listar', 'editar']),

    async listUser () {
      try {
        this.loading = true
        const list = await this.listar()
        this.paginacao(list)
        this.itensTotal = list
        this.loading = false
      } catch (error) {
        console.error(error)
      }
    },
    paginacao (user) {
      // const quantidadeExibida = Math.round(user.length / 2)
      for (let i = 0; i <= user.length; i++) {
        if (this.page === 1) {
          if (i <= 8) {
            const newArray = user.filter((item, index) => index <= i)

            this.items = newArray
          }
        } else if (this.page > 1) {
          if (i >= 9) {
            const newArray2 = user.filter((item, index) => index >= 9)

            this.items = newArray2
          }
        } else if (this.page < this.qtdPaginas) {
          if (i <= 4) {
            const newArray = user.filter((item, index) => index <= i)

            this.items = newArray
          }
        }
      }
    },
    filtroUser () {
      const buscar = this.items.filter(item => item.name === this.filter.name)
      if (buscar.length !== 0) {
        this.selectUser = buscar
      } else {
        window.alert('Usuário não encontrado!')
        this.selectUser = []
      }
    },
    // clearUser (user) {
    //   const usuario = user.split(' ')
    //   const userLimpo = usuario.filter(item => item !== '-').toString().replaceAll(',', '')
    //   const cnpjcpf = userLimpo.slice(userLimpo.length - 18)
    //   const nome = userLimpo.slice(0, userLimpo.length - 18)
    //   return { cnpjcpf, nome }
    // },
    async editUser () {
      try {
        this.loading = true
        console.log(this.acoesModal)
        const result = await this.editar(this.acoesModal)
        if (result) {
          this.fecharModal()
          this.loading = false
          window.location.reload()
        }
      } catch (error) {
        console.error(error)
      }
    },
    fecharModal () {
      this.showModal = ''
    },
    abrirModal (event) {
      console.log(event)
      this.showModal = 'is-active'
      this.acoesModal = event
    }
  }
}
</script>

<style scoped>
  /* html {
    overflow: scroll;
  } */
  /* .container{
    overflow-y: scroll !important;
  } */
  .filtro{
    display: flex;
    width: 90%;
    margin: 0 auto;
    align-items: center;
  }
  .filtro-form{
    display: flex;
    justify-content: space-between;
  }
  .filtro-exe{
    display: flex;
    align-content: center;
    gap: 10px;
  }
  .main{
    overflow-y: scroll;
    overflow-x: hidden;
    height: 600px;
  }
  .paginacao{
    margin-top: 20px;
  }
  .modal{
    position: fixed;
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, 0.4);
    z-index: 11;
    border: 1px solid;
  }
</style>
