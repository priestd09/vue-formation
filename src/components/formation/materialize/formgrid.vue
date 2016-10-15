<template>
  <div>
    <div class="row">
      <form class="col s12" :class="formClass">
        <div v-for="(row, rIdx) in config.rows" class="row">
          <div v-for="(col, cIdx) in row.columns" class="col input-field" :class="colClass[rIdx][cIdx]">

            <!-- TEXT -->
            <input v-if="col.type === 'text' || col.type ==='input'"
              v-model="value[col.model]"
              type="text" class="validate" style="width:100%"
              :placeholder="col.placeholder" :style="col.style" :class="col.class"
              @keyup="eventHandler('onkeyup', $event, col)"
              @keydown="eventHandler('onkeydown', $event, col)"
              @blur="eventHandler('onblur', $event, col, rIdx, cIdx)"
              @focus="eventHandler('onfocus', $event, col, rIdx, cIdx)"
              @change="eventHandler('onchange', $event, col)">

            <input v-if="col.type === 'password'"
              v-model="value[col.model]"
              type="password" class="validate" style="width:100%"
              :placeholder="col.placeholder" :style="col.style" :class="col.class"
              @keyup="eventHandler('onkeyup', $event, col)"
              @keydown="eventHandler('onkeydown', $event, col)"
              @blur="eventHandler('onblur', $event, col, rIdx, cIdx)"
              @focus="eventHandler('onfocus', $event, col, rIdx, cIdx)"
              @change="eventHandler('onchange', $event, col)">

            <label style="width: 100%" :class="{ active: activeLabels['r' + rIdx + 'c' + cIdx] }">
              {{col.label}}
              <span v-if="config.config.decorateRequired !== false && col.required && col.label" class="text-danger">
                  *
              </span>
            </label>
          </div>
        </div>
      </form>
    </div>
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
    data () {
      return {
        focused: {}
      }
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
              `s${col}`
            ]
            return clazz
          })
        })
      },
      activeLabels () {
        let active = {}
        _.forEach(this.config.rows, (row, rIdx) => {
          _.forEach(row.columns, (col, cIdx) => {
            let data = _.get(this.value, _.get(col, 'model'), null)
            if (data || col.placeholder || this.focused[`r${rIdx}c${cIdx}`]) active[`r${rIdx}c${cIdx}`] = true
            else active[`r${rIdx}c${cIdx}`] = false
          })
        })
        return active
      }
    },
    watch: {
      focused: {
        handler (val) {
          console.log('changed')
        },
        deep: true
      }
    },
    methods: {
      eventHandler (type, event, col, rIdx, cIdx) {
        if (type === 'onfocus') {
          console.log('setting true')
          _.set(this.focused, `["r${rIdx}c${cIdx}"]`, true)
        }
        if (type === 'onblur') {
          console.log('setting false')
          _.set(this.focused, `["r${rIdx}c${cIdx}"]`, false)
        }

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
