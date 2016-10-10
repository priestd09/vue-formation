<template lang="jade">
  .container
    div(v-for="(cfg, type) in config")
      f-button(v-if="type === 'button'", :config="cfg")
</template>

<script type="text/babel">
  import FButton from '../button/index'
  export default {
    components: {
      FButton
    },
    props: {
      value: {
        type: Object
      },
      config: {
        type: Object,
        required: true
      }
    }
  }
</script>
