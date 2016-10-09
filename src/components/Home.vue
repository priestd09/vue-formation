<template lang="jade">
  div
    formation(v-model="formData", :config='formConfig')
    button.btn.btn-primary.fa.fa-plus(@click='addForm')
    button.btn.btn-danger.fa.fa-minus(@click='delForm')
    pre {{formData}}
</template>

<script type="text/babel">
  import Formation from './formation/index'
  export default {
    components: {
      Formation
    },
    methods: {
      addForm () {
        this.counter++
        this.formConfig.forms.push({
          type: 'input',
          model: `loc.fdata${this.counter}`
        })
      },
      delForm () {
        this.formConfig.forms.pop()
      }
    },
    data () {
      return {
        counter: 1,
        formData: {
          name: 'Jon',
          loc: {
            id: 1
          }
        },
        formConfig: {
          forms: [
            { type: 'input', model: 'loc.id' },
            { type: 'input', model: 'loc["name"]' }
          ]
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  color: #42b983;
}
</style>
