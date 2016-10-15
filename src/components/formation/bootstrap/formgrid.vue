<template>
  <div class="container-fullwidth">
    <form role="form" :class="formClass">
      <div v-for="(row, rIdx) in config.rows">
        <div class="row form-group">
          <div v-for="(col, cIdx) in row.columns" :class="colClass[rIdx][cIdx]">
            <label style="width: 100%">
              {{col.label}}
              <span v-if="config.config.decorateRequired !== false && col.required && col.label" class="text-danger">
                  *
              </span>

              <!-- TEXT -->
              <input v-if="col.type === 'text' || col.type ==='input'"
                v-model="value[col.model]"
                type="text" class="form-control" style="width:100%"
                :placeholder="col.placeholder" :style="col.style" :class="col.class"
                @keyup="eventHandler('onkeyup', $event, col)"
                @keydown="eventHandler('onkeydown', $event, col)"
                @blur="eventHandler('onblur', $event, col)"
                @focus="eventHandler('onfocus', $event, col)"
                @change="eventHandler('onchange', $event, col)">

              <input v-if="col.type === 'password'"
                v-model="value[col.model]"
                type="password" class="form-control" style="width:100%"
                :placeholder="col.placeholder" :style="col.style" :class="col.class"
                @keyup="eventHandler('onkeyup', $event, col)"
                @keydown="eventHandler('onkeydown', $event, col)"
                @blur="eventHandler('onblur', $event, col)"
                @focus="eventHandler('onfocus', $event, col)"
                @change="eventHandler('onchange', $event, col)">
            </label>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script type="text/babel">
  import _ from 'lodash'

  const COL_LIMIT = 12

  export default {
    props: {
      value: { type: Object, required: true },
      config: { type: Object, required: true },
      data: { type: Object, require: true }
    },
    computed: {
      formClass () {
        let format = _.get(this.config, 'config.format', '')
        return {
          'form-inline': format === 'inline',
          'form-horizontal': format === 'horizontal'
        }
      },
      colClass () {
        return _.map(this.config.rows, (row, rIdx) => {
          return _.map(this.colWidths(row.columns), (col) => {
            let clazz = [
              `col-xs-${col}`,
              `col-sm-${col}`,
              `col-md-${col}`,
              `col-lg-${col}`
            ]
            return clazz
          })
        })
      }
    },
    methods: {
      eventHandler (type, event, col) {
        if (!_.isFunction(_.get(col, type))) return null
        let data = _.get(this.value, _.get(col, 'model'), null)
        return col[type](event, data, this.data)
      },
      colWidths (columns) {
        let filledFirst = false
        let unset = 0
        let runningCount = 0
        let widths = _.map(columns, (col, idx) => {
          let remaining = (columns.length - (idx + 1))
          if (_.isNumber(col.colspan)) {
            let currentWidth = ((col.colspan + runningCount + remaining) > COL_LIMIT) ? 1 : col.colspan
            runningCount += currentWidth
            return currentWidth
          }
          unset++
          return 0
        })

        if (unset) {
          let sum = _.sum(widths)
          let defWidth = Math.floor((COL_LIMIT - sum) / unset)
          let firstWidth = defWidth + (COL_LIMIT % unset)
          _.forEach(widths, (width, i) => {
            if (!width) {
              if (!filledFirst) {
                widths[i] = firstWidth
              } else {
                widths[i] = defWidth
              }
            }
          })
        }
        return widths
      }
    }
  }
</script>
