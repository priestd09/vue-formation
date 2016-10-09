<template lang="jade">
  div
    div(v-for="form in config.forms")
      input(v-model="self[`__formdata_${form.model}`]")
</template>

<script type="text/babel">
  import _ from 'lodash'
  import { vueSet } from '../../common/util'
  let config = {
    props: ['value', 'config'],
    computed: {},
    data () {
      return {
        self: this
      }
    },
    created () {
      console.log(this)
    },
    beforeCreate () {
      _.forEach(this.$options.propsData.config.forms, (form) => {
        config.computed[`__formdata_${form.model}`] = {
          get () {
            return _.get(this.value, form.model)
          },
          set (v) {
            vueSet(this.value, form.model, v)
          }
        }
      })
    }
  }
  export default config
</script>
