<template>
  <nav class="navbar menu" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a
        class="navbar-item"
        href="/"
      >
        <img src="../views/img/image 1.png" alt="logo" width="80">
      </a>
    </div>
    <div id="navbarBasicExample" class="navbar-menu">
      <div class="navbar-end">
        <div
          class="navbar-item"
          @mouseup="showCardLogin = !showCardLogin"
        >
          <v-avatar
            color="#228B22"
            size="50"
          >
            <span class="sigla">{{sigla}}</span>
          </v-avatar>
        </div>
      </div>
    </div>
    <CardLogin
      class="cardLogin"
      v-show="showCardLogin"
    />
  </nav>
</template>

<script>
import CardLogin from '@/components/CardLogin.vue'
export default {
  name: 'theMenu2',
  components: {
    CardLogin
  },
  props: {
    sigla: {
      type: String
    }
  },
  data () {
    return {
      showCardLogin: false
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

<style>
  a{
   color: #000;
  }
  .menu{
    box-shadow: 0px 0px 10px 1px #DCDCDC;
    padding: 5px;
    position: relative;
  }

  .sigla{
    color: #fff;
    font-size: 1.5rem;
    cursor: pointer;
  }

  .cardLogin{
    position: absolute;
    right: 10px;
    top: 70px;
    z-index: 5;
  }
</style>
