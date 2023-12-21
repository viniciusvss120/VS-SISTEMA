<template>
  <div>
    <div class="cardLogout">
      <div class="name">
        <v-icon>
          mdi-account
        </v-icon>
        <p>{{nameUser}}</p>
      </div>
      <div class="changePassword">
        <v-icon>
          mdi-lock
        </v-icon>
        <a href="#">Alterar senha</a>
      </div>
      <button
        class="button btn"
        @click="logout"
      >
        Sair
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'theCardLogin',
  data () {
    return {
    }
  },
  computed: {
    nameUser () {
      const name = window.localStorage.getItem('nameUser')
      return name
    }
  },
  methods: {
    logout () {
      window.localStorage.clear()
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
  .cardLogout{
   display: grid;
   width: 230px;
   height: 180px;
   /* border: 1px solid; */
   box-shadow: 0px 0px 2px 0px #000;
   background: #fff;
  }
  .cardLogout p {
    font-family: 'Roboto', sans-serif;
    text-align: center;
    font-size: 1.3rem;
  }
  .name {
    display: flex;
    align-items: center;
    gap: 5px;
  }
  .changePassword {
    align-self: end;
    color: blue;
  }
  .btn {
    align-self: end;
    width: 100%;
    background: red;
    color: #fff;
    font-family: Arial, Helvetica, sans-serif;
    font-weight: 500;
    font-size: .852rem;
  }
</style>>
