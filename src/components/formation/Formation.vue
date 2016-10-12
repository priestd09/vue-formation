<script type="text/babel">
  import _ from 'lodash'
  import Bootstrap from './bootstrap/index'
  import Materialize from './materialize/index'
  import { syncModelProps } from './common'

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
          return _.includes(['bootstrap', 'materialize'], value)
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
      }
    },
    data () {
      return {
        frameworks: {
          bootstrap: Bootstrap,
          materialize: Materialize
        },
        formData: {},
        forms: []
      }
    },
    mounted () {
      syncModelProps.call(this)
    },
    watch: {
      config: {
        handler () {
          syncModelProps.call(this)
        },
        deep: true
      }
    },
    render (createElement) {
      let Framework = this.frameworks[this.framework]
      return createElement('div', {
        class: {
          'formation': true
        }
      }, _.without(_.map(this.config.components, (component) => {
        let cmp = Framework[component.type]
        return _.isFunction(cmp) ? cmp(component, createElement) : createElement(cmp)
      }), undefined))
    }
  }
</script>
