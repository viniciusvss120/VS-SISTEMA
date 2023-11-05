<template>
  <div class="container">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'theFiltro'
}
</script>

<style scoped>
  .container{
    margin: 20px auto;
    box-shadow: 1px 1px 10px 0px #DCDCDC;
  }

  .filtroContainer{
    padding: 10px;
  }
</style>
