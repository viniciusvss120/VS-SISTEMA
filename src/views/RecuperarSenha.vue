<template>
  <div>
    <div class="main1">
      <a
        class="button is-primary voltar"
        href="/login"
      >
        Voltar
      </a>
      <hr>
      <transition name="slide-fade">
        <div class="cpf"
          v-if="showCpf"
        >
          <p>
            Para alterar a senha,
            precisaremos que vc digite
            seu CPF/CNPJ .
          </p>

          <div class="field has-addons flex">
            <div class="control is-expanded">
              <input
                class="input"
                type="text"
                v-model.trim="dadosEnviar.cpf_cnpj"
                @blur="formataCPJCNPJ"
                placeholder="000.000.00-00 ou 00.000.000/0001-00"
              >
            </div>
            <div class="control">
              <button
                class="button is-primary"
                @click="enviarCpfCnpj"
              >
                Enviar
              </button>
            </div>
          </div>
        </div>
      </transition>
      <Loading
        v-show="loading"
      />
      <transition name="slide-fade">

        <div class="codigo"
          v-show="showCodigo"
        >
          <p>Enviamos um código para o e-mail {{response}}.</p>
          <div class="field has-addons flex">
            <div class="control is-expanded">
              <input
                class="input"
                type="text"
                v-model="dadosEnviar.codigo"
                placeholder="código..."
              >
            </div>
            <div class="control">
              <button
                class="button is-primary"
                @click="validarToken"
              >
                Enviar
              </button>
            </div>
          </div>
        </div>
      </transition>

      <transition name="slide-fade">
        <div class="novaSenha"
          v-show="showSenha"
        >
          <p>Vamos redefinir uma nova senha.</p>
          <div class="field has-addons flex">
            <form class="control is-expanded novasenha" @submit.prevent="onSubmit" >
              <input
                type="password"
                class="input"
                v-model="dadosEnviar.novaSenha"
                placeholder="Nova senha"
              >
              <input
                type="password"
                class="input mt-5"
                v-model="dadosEnviar.confirmarSenha"
                placeholder="Confirmar senha"
              >
              <button
                class="button is-primary"
                @click="alterarSenha"
              >
                Alterar
              </button>
            </form>
            <!-- <div class="control is-expanded">
              <input
                type="password"
                class="input"
                placeholder="confirmar senha"
              >
            </div> -->
          </div>
        </div>
      </transition>

    </div>
  </div>
</template>
<script>

import { mapActions } from 'vuex'
import Loading from '@/components/Loading.vue'

export default {
  name: 'TheRecuperarSenha',
  components: {
    Loading
  },
  data () {
    return {
      showCpf: true,
      showCodigo: false,
      showSenha: false,
      loading: false,
      dadosEnviar: {
        cpf_cnpj: '',
        codigo: '',
        novaSenha: '',
        confirmarSenha: ''
      },
      token_Info: null,
      response: ''
    }
  },
  methods: {
    ...mapActions('users', ['envioCpfCnpj', 'verificarCodToken', 'updateSenha']),

    async enviarCpfCnpj () {
      try {
        this.loading = true
        const info = {
          cpf_cnpj: this.dadosEnviar.cpf_cnpj
        }
        const result = await this.envioCpfCnpj(info)
        console.log(result)

        if (result) {
          this.token = result.data.token
          this.response = result.data.response

          this.showCpf = false
          this.showCodigo = true
        }
        this.loading = false
      } catch (error) {
        console.error(error)
      }
    },

    async validarToken () {
      try {
        this.loading = true
        const verificarToken = await this.verificarCodToken({ cod_token: this.dadosEnviar.codigo })
        console.log(verificarToken)
        if (verificarToken) {
          this.token_Info = verificarToken.data
          this.showCodigo = false
          this.showSenha = true
        } else {
          window.alert(verificarToken.data)
        }
        this.loading = false
      } catch (error) {
        console.log(error)
      }
    },

    async alterarSenha () {
      try {
        if (this.dadosEnviar.novaSenha === this.dadosEnviar.confirmarSenha) {
          const result = await this.updateSenha({ id: this.token_Info, nova_senha: this.dadosEnviar.novaSenha })
          console.log(result)
          if (result) {
            window.alert('Senha alterada com sucesso')
            window.history.pushState({}, null, '/')
            window.location.reload()
          }
        }
      } catch (error) {
        console.log(error)
      }
    },

    formataCPJCNPJ () {
      /* eslint operator-linebreak: ["error", "after"] */

      const cnpjRegex = /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/
      const cpfRegex = /(\d{3})(\d{3})(\d{3})(\d{2})/

      this.dadosEnviar.cpf_cnpj = this.dadosEnviar.cpf_cnpj.length === 14 ?
        this.dadosEnviar.cpf_cnpj.replace(cnpjRegex, function (regex, arg1, arg2, arg3, arg4, arg5) {
          return arg1 + '.' + arg2 + '.' + arg3 + '/' + arg4 + '-' + arg5
        }) :
        this.dadosEnviar.cpf_cnpj.replace(cpfRegex, function (regex, arg1, arg2, arg3, arg4) {
          return arg1 + '.' + arg2 + '.' + arg3 + '-' + arg4
        })
      console.log(this.dadosEnviar.cpf_cnpj)
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
  .main1{
    width: 50%;
    /* border: 1px solid; */
    margin: 100px auto;
  }
  .main1 p {
    font-family: 'Roboto', sans-serif;
    font-size: 1.5rem;
    color: #000;
    max-width: 65%;
    margin: 0 auto;
    /* text-align: center; */
  }
  .flex{
    margin: 50px auto;
    width: 65%;
    justify-content: center;
  }
  .flex input {
    width: 100%;
  }

  .novasenha button {
    margin-top: 20px;
  }

  .slide-fade-enter-active {
  transition: all .3s ease;
  }
  .slide-fade-leave-active {
    transition: all .0s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-to
  /* .slide-fade-leave-active em versões anteriores a 2.1.8 */ {
    transform: translateX(-10px);
    opacity: 0;
  }
</style>
