<template>
  <div >
    <div class="modalContainer" v-show="showFinalizarVenda">
      <v-btn icon dark class="fechar" @click="fechar"><v-icon>mdi-close</v-icon></v-btn>
      <div class="msg">
        <p>Deseja finalizar a Venda ?</p>
      </div>
      <v-divider></v-divider>
      <div class="btnModal">
        <button class="button sim" @click="sim">Sim</button>
        <button class="button nao" @click="fechar">Não</button>
      </div>
    </div>

    <div class="modalContainer" v-show="showModal.deletar">
      <v-btn icon dark class="fechar" @click="fechar"><v-icon>mdi-close</v-icon></v-btn>
      <div class="msg">
        <p>Deseja excluir este item ?</p>
      </div>
      <v-divider></v-divider>
      <div class="btnModal">
        <button class="button sim" @click="deletarVenda">Sim</button>
        <button class="button nao" @click="fechar">Não</button>
      </div>
    </div>

    <div class="modalContainer" v-show="showModal.editar">
      <v-btn icon dark class="fechar" @click="fechar"><v-icon>mdi-close</v-icon></v-btn>
      <div class="msg">
        <p>Alterar Quantidade</p>
      </div>
      <div class="qtd">
        <label>Quantidade</label>
        <input class="input" type="number" placeholder="0" v-model.trim="quantidade">
      </div>
      <v-divider></v-divider>
      <div class="btnModal">
        <button class="button sim" @click="editVenda">Salvar</button>
        <button class="button nao" @click="fechar">Cancelar</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'theModalConfirma',
  props: {
    showModal: {
      type: Object
    }
  },
  data () {
    return {
      modalFinalizarVenda: true,
      quantidade: null
    }
  },
  created () {
    console.log(this.showModal, this.showModal.quantidade)
    this.quantidade = this.showModal.quantidade
  },
  computed: {
    showFinalizarVenda () {
      const modal = !this.showModal.editar && !this.showModal.deletar ? this.modalFinalizarVenda : !this.modalFinalizarVenda

      return modal
    }
  },
  methods: {
    fechar () {
      this.$emit('fechar')
    },
    sim () {
      this.$emit('sim')
    },
    editVenda () {
      const item = {
        nomeProduto: this.showModal.item,
        quantidade: this.quantidade

      }
      this.$emit('editVenda', item)
    },
    deletarVenda () {
      const item = {
        nomeProduto: this.showModal.item,
        quantidade: this.quantidade

      }
      this.$emit('deletarVenda', item)
    }
  }
}
</script>

<style>
.main {
  z-index: 40;
}
.modalContainer {
  display: grid;
  /* gap: 15px; */
  background: #ffffff;
  color: #000;
  width: 30%;
  margin: 200px auto;
  box-shadow: 0px 0px 15px 0px #000;
}

.fechar{
  justify-self: end;
  text-align: end;
  font-size: 1.5rem;
  color: #fff;
  width: 100%;
  background: #228B22;
}

.msg{
  font-family: 'Roboto',sans-serif;
  font-size: 1.5rem;
  text-align: center;
  /* background: #ffffff; */
}

.btnModal{
  display: flex;
  gap: 10px;
  justify-self: end;
  margin-right: 1px;
}
.sim{
  background: #228B22;
  color: #fff;
}
.nao{
  background: red;
  color: #fff;
}
</style>
