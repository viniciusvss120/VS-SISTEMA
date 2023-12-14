<template>
  <div class="modal">
  <div class="modal-background" @click="fecharModal"></div>
  <div class="modal-content">
    <form class="box card" @submit="form">
      <div class="content is-normal header">
        <h1>Cadastrar</h1>
        <!-- <span
          class="btnModal"
          @click="fecharModal"
        >X</span> -->
      </div>
      <slot></slot>
      <v-card-text v-show="acoesModal.visualizar">
        <div class="field">
          <label class="label">Name</label>
          <div class="control">
            <input class="input" type="text" :value="acoesModal.name" placeholder="Nome" disabled>
          </div>
        </div>

        <div class="field">
          <label class="label">Email</label>
          <div class="control">
            <input class="input" type="email" :value="acoesModal.email" placeholder="usuario@gmail.com"  disabled>
          </div>
        </div>
        <div class="field">
          <label class="label">CPF/CNPJ</label>
          <div class="control">
            <input class="input" type="text" :value="acoesModal.cpf_cnpj" placeholder="00.000.000/0001-00"  disabled>
          </div>
        </div>
        <div class="field">
          <label class="label">Perfil</label>
          <div class="control">
            <input class="input" type="text" :value="acoesModal.perfil" disabled>
          </div>
        </div>
        <!-- <v-text-field label="Senha"></v-text-field> -->
      </v-card-text>
      <v-card-actions
        v-if="acoesModal.editar"
      >
        <v-spacer></v-spacer>
        <button
          class="button is-normal is-danger"
          @click="fecharModal"
        >
          Cancelar
        </button>
        <button
          class="button is-normal is-success ml-2"
          @click="salvar"
        >
          Salvar
        </button>
      </v-card-actions>
      <v-card-actions
        v-if="acoesModal.deletar"
      >
        <button
          class="button is-normal is-danger ml-2"
          @click="excluir"
        >
          Excluir
        </button>
      </v-card-actions>
    </form>
  </div>
  <button class="modal-close is-large" aria-label="close" @click="fecharModal"></button>
</div>
</template>

<script>
export default {
  name: 'theModal2',
  props: {
    showModal: {
      type: String,
      default: ''
    },
    acoesModal: {
      type: Object
    }
  },
  methods: {
    fecharModal () {
      this.$emit('fecharModal', this.showModal)
    },
    form (e) {
      e.preventDefault()
    },
    salvar () {
      this.$emit('salvar')
    },
    excluir () {
      this.$emit('excluir')
    }
  }
}
</script>

<style>
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
