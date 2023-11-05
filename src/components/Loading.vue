<template>
   <v-progress-circular
    :size="70"
    :width="7"
    color="black"
    indeterminate
    class="progress"
  ></v-progress-circular>
</template>
<script>
export default {
  name: 'theLoading'
}
</script>
<style scoped>
  .progress {
    margin: 1rem 50%;
    z-index: 5;

  }
</style>
