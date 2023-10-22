<template>
  <div class="container">
    <v-card class="card">
      <div class="header">
        <h2>Cadastrar</h2>
        <span
          class="btnModal"
          @click="fecharModal"
        >X</span>
      </div>
      <v-card-text>
        <v-text-field label="Nome"></v-text-field>
        <v-text-field label="Email" type="email" placeholder="usuario@gmail.com"></v-text-field>
        <v-text-field label="CNPJ"></v-text-field>
        <v-text-field label="Perfil"></v-text-field>
        <v-text-field label="Senha"></v-text-field>
      </v-card-text>
      <v-card-actions
        v-if="acoesModal.editar"
      >
        <v-spacer></v-spacer>
        <v-btn
          class="cancelar"
        >
          cancelar
        </v-btn>
        <v-btn
          class="salvar"
        >
          Salvar
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'theModal',
  props: {
    showModal: {
      type: Boolean,
      default: true
    },
    acoesModal: {
      type: Object
    }
  },
  methods: {
    fecharModal () {
      this.$emit('fecharModal', this.showModal)
    }
    // abrirModal () {
    //   this.showModal = true
    // }
  }

}
</script>

<style scoped>
  .container {
    box-shadow: 0px 0px 10px 0px #000000;
    max-width: 30%;
    margin: 20px auto;
  }
  .card {
    font-family: Arial, Helvetica, sans-serif;
    padding-top: 20px;

  }

  .cancelar {
    color: red;
    margin-right: 10px;
  }

  .salvar {
    color: green;
  }
  .header{
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .header h2 {
    margin-left: 10px;
  }
  .btnModal{
    margin-right: 10px;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 1.7rem;
    padding: 10px;
    color: red;
    cursor: pointer;
  }
</style>
