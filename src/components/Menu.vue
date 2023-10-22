<template>
  <div class="container">
    <nav>
      <div class="navegacao">
        <img src="../views/img/image 1.png" alt="logo">
      </div>
      <v-btn
        class="btnLogin"
        elevation="6"
        large
        x-large
      >
        <router-link to="/login" style="color: green">{{sigla}}</router-link>
      </v-btn>
    </nav>
  </div>
</template>
<script>

export default {
  name: 'theMenu',
  props: {
    sigla: {
      type: String
    }
  }
}
</script>

<style scoped>
  .container{
    box-shadow: 0px 0px 10px 1px #DCDCDC;
  }
  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    align-content: center;
    width: 100%;
    margin: 0px auto 5px auto;
  }

  .navegacao{
    width: 12%;
    padding: 10px;
  }
  .navegacao img{
    max-width: 150px;
  }
  /* .navegacao ul {
    display: flex;
    list-style: none;
    gap: 20px;
    align-items: center;
    font-family: Arial;
    margin-left: 20px;
    font-size: 1.2rem;
  } */
  .btnLogin{
    margin-right: 15px;
  }
  .btnLogin a{
    text-decoration: none;
    color: #000;
    font-weight: bold;
  }
</style>
