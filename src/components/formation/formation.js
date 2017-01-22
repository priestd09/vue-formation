import VueMultiVersion from 'vue-multi-version'
import { FRAMEWORKS, BOOTSTRAP } from './common/constants'
import { vueSet, extractBindings, dash as _ } from './common/index'
import register from './common/registerFormationComponents'

export default {
  install (Vue) {
    // create a new multi version instance
    let multi = VueMultiVersion(Vue)
    let registerFormationComponents = register(Vue)

    // register global formation register function
    Vue.prototype.$registerFormationComponents = registerFormationComponents

    // register the formation component
    Vue.component('formation', {
      name: 'formation',
      template: `
<div class="formation">
  <component v-for="c in _config.components"
    :is="'formation-' + c.type"
    :config="c.config"
    :components='c.components'
    :bindings="_bindings"
    :framework="framework"
    ${multi.select(':value.sync', 'v-model')}="modelData"></component>
</div>
`,
      props: {
        value: {
          type: Object,
          defaultValue () {
            return {}
          },
          twoWay: multi.select(true, undefined)
        },
        config: {
          type: Object,
          required: true
        },
        framework: {
          type: String,
          default: BOOTSTRAP,
          validator (value) {
            return _.includes(FRAMEWORKS, value)
          }
        }
      },
      created () {
        this.syncModelProps()
        switch (this.framework) {
          case BOOTSTRAP:
            registerFormationComponents(this, this._config.components, this._bindings, BOOTSTRAP)
            break
          default:
            break
        }
      },
      computed: {
        _bindings () {
          return extractBindings(this._config)
        },
        _config () {
          return this.config
        }
      },
      methods: {
        findModels (obj, models = []) {
          if (_.has(obj, 'config.model')) models.push(obj.config.model)
          if (_.isArray(_.get(obj, 'components'))) {
            _.forEach(obj.components, (c) => {
              this.findModels(c, models)
            })
          }
          if (_.isArray(_.get(obj, 'rows'))) {
            _.forEach(obj.rows, (row) => {
              if (_.isArray(_.get(row, 'columns'))) {
                _.forEach(row.columns, (col) => {
                  if (col.model) models.push(col.model)
                })
              }
            })
          }
          return models
        },
        syncModelProps () {
          _.forEach(_.uniq(this.findModels(this._config)), (model) => {
            if (!this.modelData.hasOwnProperty(model)) {
              Object.defineProperty(this.modelData, model, {
                configurable: true,
                enumerable: true,
                get: () => _.get(this.value, model),
                set: (v) => vueSet(this.value, model, v)
              })
            }
          })
        }
      },
      watch: {
        _config: {
          handler () {
            this.$nextTick(this.syncModelProps)
          },
          deep: true
        }
      },
      data () {
        return {
          modelData: {}
        }
      }
    })
  }
}
