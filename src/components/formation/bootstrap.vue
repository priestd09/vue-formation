<template lang="jade">
  div
    input(v-model="path1")
</template>

<script type="text/babel">
  import _ from 'lodash'
  let config = {
    props: ['value'],
    computed: {},
    data () {
      return {
        path: 'loc.id'
      }
    },
    beforeCreate () {
      config.computed.path1 = {
        get () {
          return this.value.loc.id
        },
        set (v) {
          _.set(this.value, 'loc.id', v)
        }
      }
    }
  }
  export default config
</script>
