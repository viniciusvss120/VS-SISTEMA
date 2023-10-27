<template>
  <div class="container">
    <div class="filtroContainer">
      <v-form class="filtro">
        <v-text-field
          label="nome"
          outlined
          dense
        />
        <v-text-field
          label="email"
          type="email"
          outlined
          dense
        />
        <v-btn
          elevation="2"
          large
          x-large
        >Buscar</v-btn>
      </v-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'theFiltro'

}
</script>

<style scoped>
  .container{
    width: 80%;
    margin: 50px 0px 50px 0px;
    box-shadow: 1px 1px 10px 0px #DCDCDC;
  }

  .filtroContainer{
    padding: 10px;
  }

  .filtro{
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    align-items: flex-start;
  }
</style>
