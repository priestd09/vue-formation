<template>
  <div>
    <form class="ui form">
      <div v-for="(row, rIdx) in config.rows" class="field">
        <div class="fields">
          <div v-for="(col, cIdx) in row.columns" class="field wide" :class="colClass[rIdx][cIdx]">

            <label :for="'form_' + uid + '_r' + rIdx + 'c' + cIdx">
              {{col.label}}
              <span v-if="config.config.decorateRequired !== false && col.required && col.label" class="text-danger">
                  *
            </span>
            </label>

            <!-- TEXT -->
            <div v-if="isTextType(col.type)" class="ui input" :class="prefixClass(col)">
              <div v-if="col.textPrefix" class="ui label">
                {{col.textPrefix}}
              </div>

              <input v-if="col.type === 'text' || col.type ==='input'"
                     v-model="value[col.model]"
                     :id="'form_' + uid + '_r' + rIdx + 'c' + cIdx"
                     type="text"
                     :placeholder="col.placeholder" :style="col.style" :class="col.class"
                     @keyup="eventHandler('onkeyup', $event, col)"
                     @keydown="eventHandler('onkeydown', $event, col)"
                     @blur="eventHandler('onblur', $event, col, rIdx, cIdx)"
                     @focus="eventHandler('onfocus', $event, col, rIdx, cIdx)"
                     @change="eventHandler('onchange', $event, col)">

              <input v-if="col.type === 'password'"
                     v-model="value[col.model]"
                     :id="'form_' + uid + '_r' + rIdx + 'c' + cIdx"
                     type="password"
                     :placeholder="col.placeholder" :style="col.style" :class="col.class"
                     @keyup="eventHandler('onkeyup', $event, col)"
                     @keydown="eventHandler('onkeydown', $event, col)"
                     @blur="eventHandler('onblur', $event, col, rIdx, cIdx)"
                     @focus="eventHandler('onfocus', $event, col, rIdx, cIdx)"
                     @change="eventHandler('onchange', $event, col)">

              <i v-if="col.iconPrefix && !col.textPrefix" class="icon" :class="col.iconPrefix"></i>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script type="text/babel">
  import _ from 'lodash'
  import { colWidths, isTextType } from '../common'
  const COL_LIMIT = 16

  const FIELD_WIDTH = [
    'zero',
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine',
    'ten',
    'eleven',
    'twelve',
    'thirteen',
    'fourteen',
    'fifteen',
    'sixteen'
  ]

  export default {
    props: {
      value: { type: Object, required: true },
      config: { type: Object, required: true },
      data: { type: Object, require: true }
    },
    data () {
      return {
        isFocused: {},
        uid: Date.now().toString()
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
          let colSizes = colWidths(row.columns, COL_LIMIT)
          return _.map(row.columns, (col, cIdx) => {
            let clazz = [
              `${FIELD_WIDTH[colSizes[cIdx]]}`
            ]
            return clazz
          })
        })
      }
    },
    methods: {
      isTextType,
      prefixClass (col) {
        let clazz = {}
        if (col.iconPrefix && !col.textPrefix) {
          clazz.left = true
          clazz.icon = true
        } else if (col.textPrefix) {
          clazz.labeled = true
        }
        return clazz
      },
      eventHandler (type, event, col, rIdx, cIdx) {
        if (type === 'onfocus') this.$set(this.isFocused, `r${rIdx}c${cIdx}`, true)
        if (type === 'onblur') this.$set(this.isFocused, `r${rIdx}c${cIdx}`, false)

        if (!_.isFunction(_.get(col, type))) return null
        let data = _.get(this.value, _.get(col, 'model'), null)
        return col[type](event, data, this.data)
      }
    }
  }
</script>
