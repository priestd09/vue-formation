<template lang="jade">
  div
    br
    br
    formation(v-model="formData", :config='formConfig', :framework='framework')
    br
    br
    button.btn.btn-primary.fa.fa-plus(@click='addForm')
    button.btn.btn-danger.fa.fa-minus(@click='delForm')
    button.btn.btn-success
      i
        | G
    pre {{formData}}
</template>

<script type="text/babel">
  // import Vue from 'vue'
  import _ from 'lodash'
  import Formation from './formation/Formation'
  import { vueSet } from '../common/util'
  export default {
    props: ['framework'],
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
          components: [
            {
              type: 'container',
              config: {},
              components: [
                {
                  type: 'ftable'
                }
              ]
            },
            {
              type: 'container',
              components: [
                {
                  type: 'button',
                  config: {
                    class: ['btn-primary'],
                    content: '<i>HI</i>',
                    onclick (e) {
                      console.log('clicked', e)
                    }
                  }
                }
              ]
            }
          ],
          layout: {
            container: {
              button: {
                class: ['btn-primary'],
                content: '<i>HI</i>',
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
