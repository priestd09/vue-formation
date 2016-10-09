<template lang="jade">
  div
    div(v-for="form in forms")
      input(v-if="validForm(form)", v-model="formData[form.model]")
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
