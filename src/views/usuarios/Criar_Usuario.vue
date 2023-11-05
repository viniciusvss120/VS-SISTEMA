<template>
  <div class="">
    <div class="criarUser">
      <h1 class="title">Criar usuário</h1>
      <div class="field">
        <label class="label">Nome</label>
        <div class="control">
          <input
            :class="`input ${classInput}`"
            v-model="user.name"
            type="text"
            placeholder="Nome Completo"
          >
        </div>
        <p
          class="help is-danger"
          v-show="msg"
        >
          Campo obrigatório
        </p>
      </div>
        <div class="field">
          <label class="label">E-mail</label>
          <div class="control">
            <input
              :class="`input`"
              v-model="user.email"
              type="email"
              placeholder="user@gmail.com">
          </div>
          <p
            class="help is-danger"
            v-show="msg"
          >
            Campo obrigatório
          </p>
      </div>
        <div class="field">
          <label class="label">Senha</label>
          <div class="control">
            <input
              :class="`input ${classInput}`"
              v-model="user.password"
              type="password"
              placeholder="Senha com no minímo 8 digitos"
            >
          </div>
          <p
            class="help is-danger"
            v-show="msg"
          >
            Campo obrigatório
          </p>
      </div>
        <div class="field">
          <label class="label">CPF/CNPJ</label>
          <div class="control">
            <input
              :class="`input ${classInput}`"
              v-model="user.cpf_cnpj"
              type="text"
              placeholder="00.000.000/0001-00 ou 111.111.111-11"
            >
          </div>
          <p
            class="help is-danger"
            v-show="msg"
          >
            Campo obrigatório
          </p>
      </div>
      <div class="field">
        <label class="label">Perfil</label>
        <div class="control">
          <div class="select">
            <select
              v-model="user.perfil"
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
            v-show="msg"
          >
            Campo obrigatório
          </p>
        </div>
      </div>
      <button
        class="button is-success is-normal mt-6"
        @click="criarUser"
      >
        Enviar
      </button>

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
      msg: false,
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
          window.history.pushState({}, null, '/usuarios')
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
          this.msg = true
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
    }
  }
  // watch: {
  //   user (newValue, oldValue) {
  //     console.log('Aqui:', newValue)
  //   // for (const prop in this.user) {
  //     //   if (this.user[prop]) {
  //     //     this.classInput = ''
  //     //     this.msg = false
  //     //     console.log('estou execultando')
  //     //   }
  //     // }
  //   }
  // }
}
</script>

<style>
.criarUser{
  display: grid;
  max-width: 60%;
  margin: 50px auto auto 50px;
}
</style>
