<script type="text/babel">
  import _ from 'lodash'
  import Bootstrap from './bootstrap/index'
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
      return createElement('div', {
        class: {
          'formation-bootstrap': true
        }
      }, _.map(this.config.layout, (cfg, type) => Bootstrap[type](cfg, createElement)))
    }
  }
</script>
