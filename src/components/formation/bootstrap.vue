<template lang="jade">
  div
    div(v-for="form in config.forms")
      input(v-model="formData[form.model]")
</template>

<script type="text/babel">
  import { syncModelProps } from './common'
  export default {
    props: {
      value: {
        type: Object,
        required: true
      },
      config: {
        type: Object,
        required: true
      }
    },
    computed: {},
    data () {
      return {
        formData: {}
      }
    },
    created () {
      syncModelProps.call(this)
    },
    watch: {
      config: {
        handler () {
          syncModelProps.call(this)
        },
        deep: true
      }
    }
  }
</script>
