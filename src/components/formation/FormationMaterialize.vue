<script type="text/babel">
  import _ from 'lodash'
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
          'formation-materialize': true
        }
      }, _.map(this.config.layout, (cfg, type) => Materialize[type](cfg, createElement)))
    }
  }
</script>
