<template lang="jade">
  div
    formation(v-model="formData")
    pre {{formData}}
</template>

<script type="text/babel">
  import Formation from './formation/index'
  export default {
    components: {
      Formation
    },
    data () {
      return {
        formData: {
          name: 'Jon',
          loc: {
            id: 1
          }
        },
        msg: 'Hello Vue!'
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  color: #42b983;
}
</style>
