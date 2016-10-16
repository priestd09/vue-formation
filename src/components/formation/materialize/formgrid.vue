<template>
  <div>
    <div class="row">
      <form class="col s12" :class="formClass">
        <div v-for="(row, rIdx) in config.rows" class="row">
          <div v-for="(col, cIdx) in row.columns" class="col input-field" :class="colClass[rIdx][cIdx]">

            <i v-if="(col.iconPrefix || col.textPrefix) && isTextType(col.type)" class="material-icons prefix"
              :class="{ active: isFocused['r' + rIdx + 'c' + cIdx] }">{{col.iconPrefix || col.textPrefix}}</i>

            <!-- TEXT -->
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

            <label :class="{ active: isFocused['r' + rIdx + 'c' + cIdx] || value[col.model] || col.placeholder }"
              :for="'form_' + uid + '_r' + rIdx + 'c' + cIdx">
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
  import { colWidths, isTextType } from '../common'
  const COL_LIMIT = 12

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
          return _.map(colWidths(row.columns, COL_LIMIT), (col) => {
            let clazz = [
              `s${col}`
            ]
            return clazz
          })
        })
      }
    },
    methods: {
      isTextType,
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
