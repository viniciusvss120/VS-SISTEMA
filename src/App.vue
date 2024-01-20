<template>
 <v-main>
    <router-view/>
 </v-main>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  })
}
</script>

<style>
  html, body {
   overflow: hidden !important;
  }
  .navigation{
    display: grid;
    grid-template-columns: 250px 1fr;
    max-height: 100vh !important;
    /* border: 1px solid; */

  }
</style>
