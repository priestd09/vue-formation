<template lang="jade">
  <div>
    formation(:value.sync='formData', :config='formConfig')
  </div>
</template>

<script>
  import Formation from '../formation/Formation'
  export default {
    data () {
      return {
        formData: {
          name: 'Jon',
          loc: {
            id: '2'
          }
        },
        formConfig: {}
      }
    }
  }
</script>
