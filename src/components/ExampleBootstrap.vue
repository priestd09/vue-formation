<template lang="jade">
  div
    h2 Bootstrap
    example-formation(framework='bootstrap')
</template>

<script type="text/babel">
  import $ from 'jquery'
  import ExampleFormation from './ExampleFormation'
  export default {
    components: {
      ExampleFormation
    },
    mounted () {
      $('#style-framework').attr('href', 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css')
    }
  }
</script>
