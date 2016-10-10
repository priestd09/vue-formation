<template lang="jade">
  div
    bootstrap(v-if="framework === 'bootstrap'", v-model='value', :config='config')
    material(v-if="framework === 'material'", v-model='value', :config='config')
</template>

<script type="text/babel">
  import _ from 'lodash'
  import Bootstrap from './bootstrap'
  import Material from './material'

  export default {
    components: {
      Bootstrap,
      Material
    },
    props: {
      value: {
        type: Object
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
