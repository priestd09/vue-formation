<script type="text/babel">
  import _ from 'lodash'
  import Bootstrap from './bootstrap/index'
  import Foundation from './foundation/index'
  import Materialize from './materialize/index'
  import SemanticUI from './semantic-ui/index'
  import { vueSet } from '../../common/util'

  const FRAMEWORKS = [
    'bootstrap',
    'foundation',
    'materialize',
    'semanticui'
  ]

  export default {
    props: {
      value: {
        type: Object,
        required: true
      },
      config: {
        type: Object,
        required: true
      },
      framework: {
        type: String,
        default: 'bootstrap',
        validator (value) {
          return _.includes(FRAMEWORKS, value)
        }
      }
    },
    computed: {},
    methods: {
      validForm (form) {
        return form && form.model && form.name
      },
      capitalize (val) {
        return _.capitalize(val)
      },
      findModels (obj, models = []) {
        if (obj.model) models.push(obj.model)
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
        _.forEach(_.uniq(this.findModels(this.config)), (model) => {
          if (!_.has(this.formData, model)) {
            Object.defineProperty(this.formData, model, {
              configurable: true,
              get: () => _.get(this.value, model),
              set: (v) => vueSet(this.value, model, v)
            })
          }
        })
      }
    },
    data () {
      return {
        frameworks: {
          bootstrap: Bootstrap,
          foundation: Foundation,
          materialize: Materialize,
          semanticui: SemanticUI
        },
        formData: {}
      }
    },
    watch: {
      config: {
        handler () {
          this.syncModelProps()
        },
        deep: true
      }
    },
    render (createElement) {
      let Framework = this.frameworks[this.framework]
      this.syncModelProps()
      return createElement('div', {
        class: {
          formation: true
        }
      }, _.without(_.map(this.config.components, (component) => {
        let cmp = Framework[component.type]
        if (_.isFunction(cmp)) return cmp(component, createElement)
        let data = {}
        switch (component.type) {
          case 'formgrid':
            data.props = { value: this.formData, config: component, data: this.value }
            break
          default:
            break
        }
        return createElement(cmp, data)
      }), undefined))
    }
  }
</script>
