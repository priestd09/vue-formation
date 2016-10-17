<template lang="jade">
  div
    br
    br
    formation(v-model="formData", :config='formConfig', :framework='framework')
    pre {{formData}}
</template>

<script type="text/babel">
  // import Vue from 'vue'
  // import _ from 'lodash'
  import Formation from '../formation/Formation'
  // import { vueSet } from '../../common/util'
  export default {
    props: ['framework'],
    components: {
      Formation
    },
    data () {
      let pfxIcon = null
      switch (this.framework) {
        case 'bootstrap':
          pfxIcon = 'glyphicon glyphicon-user'
          break
        case 'materialize':
          pfxIcon = 'account_circle'
          break
        case 'semanticui':
          pfxIcon = 'user'
          break
        default:
          break
      }

      return {
        counter: 2,
        formData: {
          name: 'Jon',
          loc: {
            id: '2'
          }
        },
        formConfig: {
          components: [
            {
              type: 'formgrid',
              config: {
                decorateRequired: false
              },
              rows: [
                {
                  columns: [
                    {
                      iconPrefix: pfxIcon,
                      type: 'text',
                      label: 'input1',
                      colspan: 2,
                      model: 'loc.id',
                      required: true,
                      onkeyup (event, value, data) {
                        console.log(event, value, data)
                      }
                    },
                    {
                      type: 'text',
                      label: 'input2',
                      model: 'loc.name'
                    },
                    {
                      textPrefix: 'OK',
                      type: 'password',
                      label: 'password',
                      model: 'password'
                    }
                  ]
                }
              ]
            },
            /*
            {
              type: 'container',
              config: {},
              components: [
                {
                  type: 'ftable'
                }
              ]
            },
            */
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
          ]
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
