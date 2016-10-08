<template lang="jade">
  div
    formation-bootstrap(v-if="framework === 'bootstrap'", v-model='value')
    formation-material(v-if="framework === 'material'", v-model='value')
</template>

<script type="text/babel">
  import _ from 'lodash'
  import FormationBootstrap from './bootstrap'
  import FormationMaterial from './material'

  export default {
    components: {
      FormationBootstrap,
      FormationMaterial
    },
    props: {
      value: Object,
      framework: {
        type: String,
        default: 'bootstrap',
        validator (value) {
          return _.includes(['bootstrap', 'material'], value)
        }
      }
    },
    created () {
      this.value._get = (path) => {
        return _.get(this.value, path)
      }
    }
  }
</script>
