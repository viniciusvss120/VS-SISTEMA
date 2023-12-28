<template>
  <div class="main">
    <div class="criarUser">
      <div class="header">
        <h1>Novo Usuário</h1>
        <div class="btn">
          <button @click="criarUser">Salvar</button>
          <button>Salvar Mais</button>
          <button class="sair" @click="() => this.$router.push('/')">Sair</button>
        </div>
      </div>
      <v-divider></v-divider>
      <div class="formUser">
        <v-form class="infoUser">
          <div class="field">
            <label class="label">Nome</label>
            <div class="control">
              <input
                :class="`input ${classInput} inputMaiores`"
                v-model.trim="user.name"
                name="name"
                type="text"
                placeholder="Nome Completo"
              >
            </div>
            <p
              class="help is-danger"
              v-show="msg.name"
            >
              Campo obrigatório
            </p>
          </div>
          <div class="field">
            <label class="label">E-mail</label>
            <div class="control">
              <input
                :class="`input`"
                v-model.trim="user.email"
                name="email"
                type="email"
                placeholder="user@gmail.com">
            </div>
            <p
              class="help is-danger"
              v-show="msg.email"
            >
              Campo obrigatório
            </p>
          </div>
            <div class="field">
              <label class="label">Senha</label>
              <div class="control">
                <input
                  :class="`input ${classInput}`"
                  v-model.trim="user.password"
                  name="password"
                  type="password"
                  placeholder="Senha com no minímo 8 digitos"
                >
              </div>
              <p
                class="help is-danger"
                v-show="msg.password"
              >
                Campo obrigatório
              </p>
          </div>
            <div class="field">
              <label class="label">CPF/CNPJ</label>
              <div class="control">
                <input
                  :class="`input ${classInput}`"
                  v-model.trim="user.cpf_cnpj"
                  @blur="formataCPJCNPJ"
                  type="text"
                  name="cpf_cnpj"
                  placeholder="00.000.000/0001-00 ou 111.111.111-11"
                >
              </div>
              <p
                class="help is-danger"
                v-show="msg.cpf_cnpj"
              >
                Campo obrigatório
              </p>
          </div>
          <div class="field">
            <label class="label">Perfil</label>
            <div class="control">
              <div class="select">
                <select
                  v-model.trim="user.perfil"
                  name="perfil"
                >
                  <option
                    v-for="item in perfil"
                    :key="item"
                    selected
                  >
                    {{item}}
                  </option>
                </select>
              </div>
              <p
                class="help is-danger"
                v-show="msg.perfil"
              >
                Campo obrigatório
              </p>
            </div>
          </div>
        </v-form>
      </div>

    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Criar_Usuario',
  data () {
    return {
      perfis: [],
      user: {
        name: '',
        email: '',
        password: '',
        cpf_cnpj: '',
        perfil: ''
      },
      msg: {
        name: false,
        email: false,
        password: false,
        cpf_cnpj: false,
        perfil: false
      },
      classInput: ''
    }
  },
  created () {
    this.listUser()
  },
  // mounted () {
  //   this.validarForm()
  //   console.log(this.user)
  // },
  // watch: {
  //   user () {}
  // },
  computed: {
    perfil () {
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
    ...mapActions('users', ['listar', 'criar']),

    async listUser () {
      try {
        const list = await this.listar(event)
        const perfil = list.map(item => item.perfil)
        this.perfis = perfil
      } catch (error) {
        console.error(error)
      }
    },

    async criarUser () {
      try {
        if (this.validarForm()) {
          const result = await this.criar(this.user)
          console.log(result)
          window.history.pushState({}, null, '/cadastro/usuarios')
          window.location.reload()
        } else {
          console.log('Deu ruim')
        }
      } catch (error) {
        console.error(error)
      }
    },

    validarForm () {
      let validacao = false

      const camposForm = this.$el.getElementsByTagName('input')
      const arrayForm = Array.from(camposForm)
      const arrayFormValor = []

      arrayForm.forEach(item => {
        if (item.value === '') {
          this.msg[item.name] = true
          item.classList.add('is-danger')
        } else {
          const campoComValor = item.value
          if (campoComValor !== '') {
            arrayFormValor.push(campoComValor)
          }
        }
      })
      if (arrayFormValor.length === arrayForm.length) {
        validacao = true
      }
      return validacao
    },
    formataCPJCNPJ () {
      /* eslint operator-linebreak: ["error", "after"] */

      const cnpjRegex = /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/
      const cpfRegex = /(\d{3})(\d{3})(\d{3})(\d{2})/

      this.user.cpf_cnpj = this.user.cpf_cnpj.length === 14 ?
        this.user.cpf_cnpj.replace(cnpjRegex, function (regex, arg1, arg2, arg3, arg4, arg5) {
          return arg1 + '.' + arg2 + '.' + arg3 + '/' + arg4 + '-' + arg5
        }) :
        this.user.cpf_cnpj.replace(cpfRegex, function (regex, arg1, arg2, arg3, arg4) {
          return arg1 + '.' + arg2 + '.' + arg3 + '-' + arg4
        })
      console.log(this.user.cpf_cnpj)
      //     return argumento1 + '.' + argumento2 + '.' + argumento3 + '-' + argumento4
      // if (this.user.cpf_cnpj.length === 13) {
      // } else {
      //   this.user.cpf_cnpj = this.user.cpf_cnpj.replace(cpfRegex, function (regex, argumento1, argumento2, argumento3, argumento4) {
      //     return argumento1 + '.' + argumento2 + '.' + argumento3 + '-' + argumento4
      //   })
      // }
    }
  }
}
</script>

<style scoped>

.main{
  overflow-y: scroll;
  overflow-x: hidden;
  height: 600px;
  font-family: 'Roboto', sans-serif;
}
.criarUser{
    width: 65%;
    /* border: 1px solid; */
    margin: 50px auto;
}

  .header{
    display: flex;
    justify-content: space-between;
    font-family: 'Roboto', sans-serif;
    color: #000000;
    /* border: 1px solid; */
  }
  .header h1 {
    font-size: 2rem;
  }
  .btn{
    display: flex;
    width: 45%;
    gap: 10px
  }

  .btn button {
    width: 260px;
    padding: 5px;
    background: #228B22;
    color: #fff;
    border-radius: 5px;
  }
  .sair {
    background: red !important;
    color: #ffffff !important;
    /* border: 1px solid; */
  }

  .infoUser {
    display: flex;
    justify-content: start;
    flex-wrap: wrap;
    gap: 20px;
  }

  /* .inputMaiores {
    width: 100%;
  } */
</style>
