<template lang="jade">
  .formation
    formation-bootstrap(v-if="framework === 'bootstrap'", v-model='value', :config='config')
    formation-materialize(v-if="framework === 'materialize'", v-model='value', :config='config')
</template>

<script type="text/babel">
  import _ from 'lodash'
  import FormationBootstrap from './FormationBootstrap'
  import FormationMaterialize from './FormationMaterialize.vue'

  export default {
    components: {
      FormationBootstrap,
      FormationMaterialize
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
          return _.includes(['bootstrap', 'materialize'], value)
        }
      }
    }
  }
</script>
