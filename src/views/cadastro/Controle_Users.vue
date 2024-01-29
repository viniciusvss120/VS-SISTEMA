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
      @excluir="deleteUser"
      :acoesModal="acoesModal"
    >
    </Modal2>

    <Filtro
      class="filtro"
      v-if="loading === false"
    >
      <v-form
        @submit.prevent="onSubmit"
      >
        <div class="form-item">
          <v-autocomplete
            v-model="filter.name"
            :items="names"
            class="name"
            hide-details
            background-color="#fff"
            clearable
            dense
            filled
            label="Nomes"
          ></v-autocomplete>
          <v-autocomplete
            v-model="filter.perfil"
            :items="listPerfis"
            class="name"
            hide-details
            background-color="#fff"
            clearable
            dense
            filled
            label="Perfil"
          />
          <v-text-field
            label="CPF/CNPJ"
            v-model.trim="filter.cpf_cnpj"
            @blur="formataCPJCNPJ"
            placeholder="00.000.000/0001-00"
            class="name"
            clearable
            hide-details
            background-color="#fff"
            dense
            filled
          />
          <div class="pesquisa">
          <v-divider
            vertical
          ></v-divider>
           <v-btn
              elevation="1"
              class="filterBtn"
              @click="filtroUser"
            >
              Buscar
            </v-btn>
            <v-icon
              @click="atualizarTabela"
              color="#228B22"
            >
              mdi-autorenew
            </v-icon>
          </div>
        </div>
      </v-form>
    </Filtro>
    <Loading
      v-show="loading"
    />
    <div
      class="msgNaoEncontrado"
      v-show="msgNaoEncontrado"
    >
      <p>Usuarios não encontrados :(</p>
    </div>

    <Tabela
      v-if="loading === false"
      v-show="msgNaoEncontrado === false"
      class="table"
      :dados="showUsers"
      :headers="headers"
      @vizualizar="abrirModal"
      @editar="abrirModal"
      @deletar="abrirModal"
    ></Tabela>
    <v-pagination
      class="paginacao"
      v-if="loading === false"
      v-show="itensTotal.length >= 9"
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
          value: 'name',
          align: 'start'
        },
        {
          text: 'E-mail',
          value: 'email',
          align: 'start'
        },
        {
          text: 'CPF/CNPJ',
          value: 'cpf_cnpj',
          align: 'start'
        },
        {
          text: 'Perfil',
          value: 'perfil',
          align: 'start'
        }
      ],
      items: [],
      itensTotal: [],
      perfis: [],
      ex: ['ds', 'sd'],
      filter: {
        name: '',
        cpf_cnpj: '',
        perfil: ''
      },
      selectUser: [],
      showModal: '',
      acoesModal: {},
      msg: 'Campo obrigatório',
      msgNaoEncontrado: false,
      page: 1,
      qtdPaginas: 2,
      loading: false
    }
  },
  async created () {
    this.loading = true
    await this.listUser()
    this.loading = false
  },
  computed: {
    ...mapState('users', ['users']),
    showUsers () {
      const user = this.items
      return this.selectUser.length === 0 ? user : this.selectUser
    },
    names () {
      const name = this.itensTotal.map(item => item.name)
      return name
    },
    listPerfis () {
      for (let i = 0; i <= this.perfis.length; i++) {
        for (let j = i + 1; j <= this.perfis.length; j++) {
          if (this.perfis[i] === this.perfis[j]) {
            // eslint-disable-next-line
            this.perfis.splice(j--,1)
          }
        }
      }
      return this.perfis
    }
  },
  methods: {
    ...mapActions('users', ['listar', 'editar', 'filtro', 'deletar']),

    async listUser () {
      try {
        this.loading = true
        const list = await this.listar()
        this.paginacao(list)
        this.itensTotal = list
        this.itensTotal.reverse()
        this.perfis = list.map(item => item.perfil)
        this.loading = false
      } catch (error) {
        console.error(error)
      }
    },
    async filtroUser () {
      try {
        this.loading = true

        const result = await this.filtro(this.filter)
        if (result.length === 0) {
          this.msgNaoEncontrado = true
          this.loading = false
        } else {
          this.msgNaoEncontrado = false
        }
        this.items = result
        console.log(this.items)
        this.loading = false
      } catch (error) {
        console.error('Deu ruim', error)
      }
    },
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
    async deleteUser () {
      try {
        const result = await this.deletar({ id: this.acoesModal.id })

        console.log = result
      } catch (error) {
        console.error(error)
      }
    },
    fecharModal () {
      this.showModal = ''
    },
    abrirModal (event) {
      this.showModal = 'is-active'
      this.acoesModal = event
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
    formataCPJCNPJ () {
      /* eslint operator-linebreak: ["error", "after"] */

      const cnpjRegex = /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/
      const cpfRegex = /(\d{3})(\d{3})(\d{3})(\d{2})/

      this.filter.cpf_cnpj = this.filter.cpf_cnpj.length === 14 ?
        this.filter.cpf_cnpj.replace(cnpjRegex, function (regex, arg1, arg2, arg3, arg4, arg5) {
          return arg1 + '.' + arg2 + '.' + arg3 + '/' + arg4 + '-' + arg5
        }) :
        this.filter.cpf_cnpj.replace(cpfRegex, function (regex, arg1, arg2, arg3, arg4) {
          return arg1 + '.' + arg2 + '.' + arg3 + '-' + arg4
        })
    },
    atualizarTabela () {
      return window.location.reload()
    }
  }
}
</script>

<style scoped>
  .filtro{
    display: flex;
    width: 90%;
  }
  .form-item {
    display: flex;
    align-items: center;
    gap: 15px;
    margin: 10px auto;
  }

  .table {
    width: 90%;
    margin: 0 auto;
    box-shadow: 0px 0px 10px 1px #DCDCDC;
  }
  /* .filtro-exe{
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 1.2rem;
  } */

  .pesquisa {
    display: flex;
    justify-content: space-around;
    width: 15%;
  }

  .name {
    border: 1px solid;
  }
  .main{
    overflow-y: scroll;
    overflow-x: hidden;
    height: 100vh;
  }
  .paginacao{
    margin-top: 20px;
  }
  .modal{
    position: fixed;
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, 0.05);
    z-index: 11;
    border: 1px solid;
  }

  .msgNaoEncontrado{
    text-align: center;
    font-size: 3rem;
  }
</style>
