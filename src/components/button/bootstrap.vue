<template lang="jade">
  button.btn(:class="config.class || 'btn-default'",
    :style="config.style",
    @click="onEvent('onclick', $event)")
    span(v-if="config.text") {{config.text}}
</template>

<script type="text/babel">
  import _ from 'lodash'
  export default {
    props: {
      config: {
        type: Object
      }
    },
    methods: {
      onEvent (type, e) {
        switch (type) {
          case 'onclick':
            if (_.isFunction(this.config.onclick)) this.config.onclick(e)
            break
          default:
            break
        }
      }
    }
  }
</script>
