<template lang="jade">
  .formation
    formation-bootstrap(v-if="framework === 'bootstrap'", v-model='value', :config='config')
    formation-material(v-if="framework === 'material'", v-model='value', :config='config')
</template>

<script type="text/babel">
  import _ from 'lodash'
  import FormationBootstrap from './FormationBootstrap'
  import FormationMaterial from './FormationMaterial.vue'

  export default {
    components: {
      FormationBootstrap,
      FormationMaterial
    },
    props: {
      value: {
        type: Object,
        required: true
      },
      config: {
        type: Object,
        required: true
      },
      framework: {
        type: String,
        default: 'bootstrap',
        validator (value) {
          return _.includes(['bootstrap', 'material'], value)
        }
      }
    }
  }
</script>
