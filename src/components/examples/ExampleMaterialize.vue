<template lang="jade">
  div
    h2 Materialize
    example-formation(framework='materialize')
</template>

<script type="text/babel">
  import $ from 'jquery'
  import ExampleFormation from './ExampleFormation'
  export default {
    components: {
      ExampleFormation
    },
    mounted () {
      $('#style-framework').attr('href', 'https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.7/css/materialize.min.css')
    }
  }
</script>
