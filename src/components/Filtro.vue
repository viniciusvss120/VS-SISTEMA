<template>
  <v-app class="container">
    <slot></slot>
  </v-app>
</template>

<script>
export default {
  name: 'theFiltro'
}
</script>

<style scoped>
  .container{
    /* margin: 15px auto; */
    height: 100px;
    box-shadow: 1px 1px 6px 0px #DCDCDC;
  }

  /* .filtroContainer{
    padding: 5px;
  } */
</style>
