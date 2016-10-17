<template lang="jade">
  div
    h2 Foundation
    example-formation(framework='foundation')
</template>

<script type="text/babel">
  import $ from 'jquery'
  import ExampleFormation from './ExampleFormation'
  export default {
    components: {
      ExampleFormation
    },
    mounted () {
      $('#style-framework').attr('href', 'https://cdnjs.cloudflare.com/ajax/libs/foundation/6.2.3/foundation.min.css')
    }
  }
</script>
