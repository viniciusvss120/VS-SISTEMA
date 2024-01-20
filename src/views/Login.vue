<template>
  <div>
      <Loading
        v-show="loading"
      />
    <div class="main">
      <div class="bloco">
        <div class="bloco-desc">

        <h1>Facilidade e a melhor experiência do mercado.</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Exercitationem alias aspernatur cumque consequuntur aut dolorem soluta
          facere velit blanditiis adipisci dignissimos nisi delectus unde minus
          quisquam corporis non, distinctio natus.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Exercitationem alias aspernatur cumque consequuntur aut dolorem soluta
          facere velit blanditiis adipisci dignissimos nisi delectus unde minus
          quisquam corporis non, distinctio natus.
        </p>
        </div>
      </div>
      <div class="login"  @keyup.enter="login">
        <v-form
          class="login-itens"
        >
          <div class="imagem">
            <img src="./img/image 1.png" alt="logo" />
          </div>
          <v-text-field
          v-model="user.email"
            label="Email"
            outlined
            dense
          ></v-text-field>
          <v-text-field
            v-model="user.password"
            label="Password"
            type="password"
            outlined
            dense
          ></v-text-field>
          <v-btn
            @click="login"
            class="button"
          >
            Entrar
          </v-btn>
          <div class="criar-recuperar">
            <!-- <a href="/criarusuario">Criar uma conta</a> | -->
            <p>
              Esqueci minha senha?
              <a href="/recuperarsenha">Crie uma nova</a>
            </p>
          </div>
        </v-form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Loading from '../components/Loading.vue'
export default {
  name: 'theLogin',
  components: {
    Loading
  },
  data () {
    return {
      user: {
        email: '',
        password: ''
      },
      loading: false
    }
  },
  methods: {
    login () {
      this.loading = true
      const userLogin = {
        email: this.user.email,
        password: this.user.password
      }
      axios.post('http://localhost:3002/login', userLogin)
        .then(response => {
          window.localStorage.setItem('nameUser', response.data.nameUser)
          window.localStorage.setItem('token', response.data.token)
          window.localStorage.setItem('logado', response.data.logado)
          this.$router.push('/')
          window.location.reload()
          // window.history.pushState({}, null, '/')
        })
        .catch(error => {
          window.alert(error.response.data)
          console.error('Deu ruim', error)
        })
      this.loading = false
    }
  }
}
</script>
<style scoped>
img {
  width: 50%;
}
.container {
  display: grid
}
.main{
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  max-width: 85%;
  overflow: hidden;
  /* border: 1px solid; */
  justify-self: center;
  margin: 40px auto;
}
.bloco {
  font-family: Arial, Helvetica, sans-serif;
  width: 100%;
  height: 100%;
  /* border: 1px solid; */
  align-self: center;
}

.bloco-desc {

  margin: 50px auto;
  max-width: 100%;
}
.bloco-desc h1{
  font-size: 4rem;
  margin-bottom: 20px;
}
.bloco-desc p {
  font-size: 1.2rem;
  line-height: 35px;
}
.login {
  margin: 50px auto;
  /* border: 1px solid; */
  height: 80%;
}

.button {
  cursor: pointer;
  font-family: Arial, Helvetica, sans-serif;
  color: #f6f6f6;
  font-size: 1.1rem;
  padding: 15px;
  margin: 0 auto;
}
.login-itens {
  margin: 0 auto;
  /* border: 1px solid; */
  box-shadow: 0px 0px 15px 10px #f8f8f8;
  display: grid;
  height: 100%;
  width: 90%;
}
.imagem {
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
}

.criar-recuperar {
  margin: 10px auto;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  width: 100%;
}
.criar-recuperar a {
  font-family: 'Roboto', Times, serif;
}
</style>
