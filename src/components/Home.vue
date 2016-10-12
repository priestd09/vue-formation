<template lang="jade">
  div
    formation(v-model="formData", :config='formConfig', framework='materialize')
    button.btn.btn-primary.fa.fa-plus(@click='addForm')
    button.btn.btn-danger.fa.fa-minus(@click='delForm')
    pre {{formData}}
</template>

<script type="text/babel">
  // import Vue from 'vue'
  import _ from 'lodash'
  import Formation from './formation/index'
  import { vueSet } from '../common/util'
  export default {
    components: {
      Formation
    },
    methods: {
      addForm () {
        this.counter++
        vueSet(this.formConfig.forms, `form${this.counter}`, {
          type: 'input',
          model: `loc.fdata${this.counter}`
        })
      },
      delForm () {
        /*
        let key = _.last(_.keys(this.formConfig.forms))
        Vue.set(this.formConfig.forms, key, undefined)
        delete this.formConfig.forms[key]
        */
        // clear and reconfig forms, otherwise forms withthe same name will remain
        this.formConfig.forms = {}
        this.$nextTick(() => {
          this.formConfig.forms = _.cloneDeep(this.formConfig2.forms)
        })
      }
    },
    data () {
      return {
        counter: 2,
        formData: {
          name: 'Jon',
          loc: {
            id: 2
          }
        },
        formConfig: {
          forms: {
            form1: { type: 'input', model: 'loc.id' },
            form2: { type: 'input', model: 'loc["name"]' }
          },
          layout: {
            container: {
              button: {
                class: ['btn-primary'],
                text: 'HI',
                onclick (e) {
                  console.log('clicked', e)
                }
              }
            }
          }
        },
        formConfig2: {
          forms: {
            form1: { type: 'input', model: 'loc.id' },
            form2: { type: 'input', model: 'loc["name"]' },
            form3: { type: 'input', model: 'loc["age"]' }
          }
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
