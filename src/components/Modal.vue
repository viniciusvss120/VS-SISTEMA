<template>
  <div class="container">

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
    },
    salvar () {
      this.$emit('salvar')
    }
  }

}
</script>

<style scoped>

</style>
