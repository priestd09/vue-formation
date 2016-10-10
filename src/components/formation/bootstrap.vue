<template lang="jade">
  div
    div(v-for="(cfg, type) in config.layout")
      f-container(v-if="type === 'container'", :config="cfg")
</template>

<script type="text/babel">
  import { syncModelProps } from './common'
  import FContainer from '../container/index'
  export default {
    components: {
      FContainer
    },
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
    methods: {
      validForm (form) {
        return form && form.model && form.name
      }
    },
    data () {
      return {
        formData: {},
        forms: []
      }
    },
    mounted () {
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
