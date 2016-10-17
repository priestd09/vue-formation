<template>
  <div>
    <form>
      <div v-for="(row, rIdx) in config.rows" class="row">
        <div v-for="(col, cIdx) in row.columns" class="columns" :class="colClass[rIdx][cIdx]">
          <label style="width: 100%">
            {{col.label}}
            <span v-if="config.config.decorateRequired !== false && col.required && col.label" class="text-danger">
                  *
            </span>

            <div class="row collapse">
              <!-- TEXT -->
              <div v-if="col.iconPrefix || col.textPrefix" class="columns small-1">
                <i v-if="col.iconPrefix && !col.textPrefix" :class="col.iconPrefix"></i>
                <span v-if="col.textPrefix" class="prefix">{{col.textPrefix}}</span>
              </div>

              <div class="columns" :class="{ 'small-11': col.textPrefix }">
                <input v-if="col.type === 'text' || col.type ==='input'"
                       v-model="value[col.model]"
                       type="text"
                       :placeholder="col.placeholder" :style="col.style" :class="col.class"
                       @keyup="eventHandler('onkeyup', $event, col)"
                       @keydown="eventHandler('onkeydown', $event, col)"
                       @blur="eventHandler('onblur', $event, col)"
                       @focus="eventHandler('onfocus', $event, col)"
                       @change="eventHandler('onchange', $event, col)">

                <input v-if="col.type === 'password'"
                       v-model="value[col.model]"
                       type="password"
                       :placeholder="col.placeholder" :style="col.style" :class="col.class"
                       @keyup="eventHandler('onkeyup', $event, col)"
                       @keydown="eventHandler('onkeydown', $event, col)"
                       @blur="eventHandler('onblur', $event, col)"
                       @focus="eventHandler('onfocus', $event, col)"
                       @change="eventHandler('onchange', $event, col)">
              </div>
            </div>
          </label>
        </div>
      </div>
    </form>
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
              `small-${col}`,
              `medium-${col}`,
              `large-${col}`
            ]
            return clazz
          })
        })
      }
    },
    methods: {
      isTextType,
      eventHandler (type, event, col) {
        if (!_.isFunction(_.get(col, type))) return null
        let data = _.get(this.value, _.get(col, 'model'), null)
        return col[type](event, data, this.data)
      }
    }
  }
</script>
