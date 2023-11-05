<template>
 <div>
  <main>
    <div
      class="modal"
      v-show="true"
    >
      <!-- <Modal
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
      </v-card-text>
      </Modal> -->
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
    <article class="filtro">
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
                  <!-- <option></option> -->
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
              <!-- <v-text-field
                label="CPF/CNPJ"
                type="text"
                v-model="filter.cnpj"
                outlined
                dense
              /> -->
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
      :dados="showUsers"
      @vizualizar="abrirModal"
      @editar="abrirModal"
    />
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
      filter: {
        name: '',
        cnpj: ''
      },
      selectUser: [],
      showModal: '',
      acoesModal: {},
      msg: 'Campo obrigatório',
      loading: false
    }
  },
  // beforeCreated () {
  //   this.loading = true
  // },
  created () {
    this.loading = true
    this.listUser()
    this.loading = false
  },
  computed: {
    ...mapState('users', ['users']),
    showUsers () {
      return this.selectUser.length === 0 ? this.items : this.selectUser
    },
    names () {
      const name = this.items.map(item => item.name)
      return name
    }
  },
  methods: {
    ...mapActions('users', ['listar', 'editar']),

    async listUser () {
      try {
        this.loading = true
        const list = await this.listar(event)
        this.items = list
        this.loading = false
      } catch (error) {
        console.error(error)
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
  /* .container{
    overflow-y: scroll !important;
  } */
  .container{
    width: 100%;
  }
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
  main{
    overflow-y: scroll;
    height: 100vh;
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
