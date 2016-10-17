<template lang="jade">
  div
    h2 SemanticUI
    example-formation(framework='semanticui')
</template>

<script type="text/babel">
  import $ from 'jquery'
  import ExampleFormation from './ExampleFormation'
  export default {
    components: {
      ExampleFormation
    },
    mounted () {
      $('#style-framework').attr('href', 'https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.4/semantic.min.css')
    }
  }
</script>
