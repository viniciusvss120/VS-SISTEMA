<template>
  <div >
    <div class="modalContainer">
      <v-btn icon dark class="fechar" @click="fechar"><v-icon>mdi-close</v-icon></v-btn>
      <div class="msg">
        <p>Deseja finalizar a Venda ?</p>
      </div>
      <v-divider></v-divider>
      <div class="btnModal">
        <button class="button sim" @click="sim">Sim</button>
        <button class="button nao" @click="nao">Não</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'theModalConfirma',
  methods: {
    fechar () {
      this.$emit('fechar')
    },
    nao () {
      this.$emit('nao')
    },
    sim () {
      this.$emit('sim')
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
