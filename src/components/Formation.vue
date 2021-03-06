<template>
  <div class="formation">
    <div v-if="isBootstrapFormat" class="container-fullwidth formation-container">
      <form role="form"
        :class="{ 'form-inline': config.format === 'inline', 'form-horizontal': config.format === 'horizontal' }">
        <div v-for="(rIdx, row) in formConfig"
          :transition="config.transition || null"
          :transition-enter="config.transitionEnter || null"
          :transition-leave="config.transitionLeave || null"
          :stagger="config.stagger || null"
          :enter-stagger="config.enterStagger || null"
          :leave-stagger="config.leaveStagger || null"
          :class="{ 'pull-left': config.align === 'left', 'pull-right': config.align === 'right' }">
          <div class="row form-group"
            :class="{ 'form-group-autoheight': row.type !== 'section', 'no-vertical-spacing': row.type === 'section' }"
            :style="{ 'height': row.height }">
            <div v-for="(fIdx, form) in row.columns"
              class="form-group"
              :id="formGroupId(rIdx, fIdx)"
              :class="colClass(row.columns, rIdx, fIdx, form.model)"
              :style="{ 'margin-right': $index === row.columns.length - 1 ? '-1px' : null }">

              <!-- Label -->
              <label :for="formId(rIdx, fIdx)"
                :style="{ 'float': config.alignLabels, 'width': '100%' }">
                {{{ getLabel(rIdx, fIdx, form.label) }}}
                <span v-if="config.decorateRequired !== false && form.required && form.label" class="text-danger">
                  *
                </span>

                <!-- text -->
                <input v-if="isTextInput(form.type)"
                  :type="form.type"
                  :name="formId(rIdx, fIdx)"
                  :id="formId(rIdx, fIdx)"
                  style="width: 100%;"
                  class="form-control"
                  :class="form.class"
                  :style="form.style"
                  :placeholder="form.placeholder"
                  :disabled="has(form, 'bind.disabled') ? form.bind.disabled() : formDisabled()"
                  @keyup="form.onKeyUp ? form.onKeyUp($event, this) : null"
                  @keydown="form.onKeyDown ? form.onKeyDown($event, this) : null"
                  @blur="form.onBlur ? form.onBlur($event, this) : null"
                  @focus="form.onFocus ? form.onFocus($event, this) : null"
                  @change="form.onChange ? form.onChange($event, this) : null"
                  v-model="formData[form.model]">
                <!-- text ./-->

                <!-- html -->
                <div v-if="form.type === 'html'" style="width: 100%;">{{{ form.value }}}</div>
                <!-- html ./-->

                <!-- button -->
                <button v-if="form.type === 'button'"
                class="btn"
                :class="form.class"
                :style="form.style"
                :disabled="has(form, 'bind.disabled') ? form.bind.disabled() : formDisabled()"
                @click.prevent="form.onClick ? form.onClick($event, this) : null">
                  <span v-if="form.iconClass", :class="form.iconClass"></span>
                  <span v-if="form.iconClass && form.text">&nbsp;</span>
                  <span v-if="form.text">{{ form.text }}</span>
                </button>
                <!-- button ./-->

                <!-- buttons -->
                <div v-if="form.type === 'buttons'"
                  :class="{ 'btn-group': form.group }"
                  :role="form.group ? 'group' : null">
                  <button v-for="btn in form.buttons"
                    class="btn"
                    :class="btn.class"
                    :style="btn.style"
                    :disabled="has(btn, 'bind.disabled') ? btn.bind.disabled() : formDisabled()"
                    @click.prevent="btn.onClick ? btn.onClick($event, this) : null">
                      <span v-if="btn.iconClass", :class="btn.iconClass"></span>
                      <span v-if="btn.iconClass && btn.label">&nbsp;</span>
                      <span v-if="btn.text">{{ btn.text }}</span>
                  </button>
                </div>
                <!-- buttons ./-->

                <!-- checkbox -->
                <div v-if="form.type === 'checkbox'">
                  <label>
                    <input type="checkbox"
                      :class="form.class"
                      :style="form.style"
                      :id="formId(rIdx, fIdx)"
                      :disabled="has(form, 'bind.disabled') ? form.bind.disabled() : formDisabled()"
                      @keyup="form.onKeyUp ? form.onKeyUp($event, this) : null"
                      @keydown="form.onKeyDown ? form.onKeyDown($event, this) : null"
                      @blur="form.onBlur ? form.onBlur($event, this) : null"
                      @focus="form.onFocus ? form.onFocus($event, this) : null"
                      @change="form.onChange ? form.onChange($event, this) : null"
                      v-model="formData[form.model]">
                    {{ form.text }}
                  </label>
                </div>
                <!-- checkbox ./-->

                <!-- radio -->
                <div v-if="form.type === 'radio'" class="radio">
                  <label v-for="(oIdx, radio) in form.filter ? form.filter(formData[form.model], form.radios) : form.radios"
                    style="display: block;">
                    <input type="radio"
                      :name="formId(rIdx, fIdx)"
                      :id="formId(rIdx, fIdx)"
                      :disabled="has(form, 'bind.disabled') ? form.bind.disabled() : formDisabled()"
                      :value="radio.value"
                      @keyup="form.onKeyUp ? form.onKeyUp($event, this) : null"
                      @keydown="form.onKeyDown ? form.onKeyDown($event, this) : null"
                      @blur="form.onBlur ? form.onBlur($event, this) : null"
                      @focus="form.onFocus ? form.onFocus($event, this) : null"
                      @change="form.onChange ? form.onChange($event, this) : null"
                      v-model="formData[form.model]">
                      {{ radio.label }}
                  </label>
                </div>
                <!-- radio ./-->

                <!-- select -->
                <div v-if="form.type === 'select'">
                  <select class="form-control"
                    :id="formId(rIdx, fIdx)"
                    :disabled="has(form, 'bind.disabled') ? form.bind.disabled() : formDisabled()"
                    @keyup="form.onKeyUp ? form.onKeyUp($event, this) : null"
                    @keydown="form.onKeyDown ? form.onKeyDown($event, this) : null"
                    @blur="form.onBlur ? form.onBlur($event, this) : null"
                    @focus="form.onFocus ? form.onFocus($event, this) : null"
                    @change="form.onChange ? form.onChange($event, this) : null"
                    v-model="formData[form.model]">
                      <option v-for="opt in form.filter ? form.filter(formData[form.model], form.options) : form.options"
                        :value="opt.value"
                        :hidden="opt.hidden">
                        {{ opt.text }}
                      </option>
                  </select>
                </div>
                <!-- select ./-->

                <!-- slot -->
                <slot v-if="form.type === 'slot' && form.name" :name="form.name"></slot>
                <!-- slot ./-->

                <!-- fselect -->
                <f-select v-if="form.type === 'fselect'"
                  :close-on-select="form.closeOnSelect"
                  :width="form.width"
                  :value.sync="formData[form.model]"
                  :options="form.options"
                  :placeholder="form.placeholder"
                  :store-object="form.storeObject"
                  :multiple="form.multiple"
                  :text-key="form.textKey"
                  :value-key="form.valueKey"
                  :on-add="form.onAdd"
                  :on-adding="form.onAdding"
                  :on-change="form.onChange"
                  :on-changing="form.onChanging"
                  :on-clear="form.onClear"
                  :on-clearing="form.onClearing"
                  :on-close="form.onClose"
                  :on-closing="form.onClosing"
                  :on-remove="form.onRemove"
                  :on-removing="form.onRemoving">
                </f-select>
                <!-- fselect ./-->
              </label>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script type="text/babel">
  import * as _ from '../utils/utils'
  import $ from '../utils/helpers'
  import fSelect from './FSelect.vue'

  export default {
    components: {
      fSelect
    },
    methods: {
      multiClickaway (evt) {
        this.$broadcast('hide::dropdown')
      },
      formDisabled () {
        if (_.isFunction(this.config.disabled)) return this.config.disabled()
        if (_.isBoolean(this.config.disabled)) return this.config.disabled
        return null
      },
      pretty (obj, label = '') {
        try {
          console.log(label, JSON.stringify(obj, null, '  '))
        } catch (err) {}
      },
      has (obj, path) {
        return _.has(obj, path)
      },
      isTextInput (type) {
        return this.textTypes.indexOf(type) !== -1
      },
      isButtonType (type) {
        return this.buttonTypes.indexOf(type) !== -1
      },
      isTopLabeled (type) {
        return this.noTopLabel.indexOf(type) === -1
      },
      getLabel (rIdx, cIdx, label) {
        let labelCount = 0
        let row = _.get(this.formConfig, `[${rIdx}]`, [])
        _.forEach(row.columns, (col, idx) => {
          let lbl = _.get(col, 'label', null)
          if (lbl) labelCount++
        })
        if (!labelCount) return null
        if (labelCount && !label) return '&nbsp;'
        return label
      },
      formId (rowIndex, formIndex) {
        return this.$get('uuid')
          .concat('r').concat(rowIndex)
          .concat('f').concat(formIndex)
      },
      formGroupId (rIdx, fIdx) {
        return this.formId(rIdx, fIdx).concat('_group')
      },
      formGroup (rIdx, fIdx) {
        return $('#'.concat(this.formGroupId(rIdx, fIdx)))
      },
      colClass (columns, rIdx, fIdx, path) {
        let cols = Math.floor(12 / columns.length)
        if (fIdx === 0) cols += 12 % columns.length
        let classes = []
        if (!this.isTopLabeled(columns[fIdx].type)) {
          classes.push('focused')
          classes.push('blured')
        }
        if (this.config.floatingLabels) classes.push('label-floating')
        classes.push('col-xs-'.concat(cols))
        classes.push('col-sm-'.concat(cols))
        classes.push('col-md-'.concat(cols))
        classes.push('col-lg-'.concat(cols))
        return classes
      },
      calcProgress () {
        let requiredCount = 0
        let requiredFilled = 0
        this.valid = true
        _.forEach(this.formConfig, (row, rIdx) => {
          _.forEach(row.columns, (form, fIdx) => {
            let data = _.get(this.formData, form.model)
            let valid = _.isFunction(form.validate) ? form.validate(data) : true
            if (!valid) {
              this.valid = false
              if (this.config.liveValidation && this.touched) this.formGroup(rIdx, fIdx).addClass('has-error')
            } else {
              this.formGroup(rIdx, fIdx).removeClass('has-error')
            }
            if (form.required) {
              requiredCount++
              if (valid && data) requiredFilled++
            }
          })
        })
        this.touched = true
        if (!requiredCount) return 100
        return Math.floor((requiredFilled / requiredCount) * 100)
      },
      validate () {
        this.valid = true
        this.touched = true
        _.forEach(this.formConfig, (row, rIdx) => {
          _.forEach(row.columns, (form, fIdx) => {
            let data = _.get(this.formData, form.model)
            let valid = _.isFunction(form.validate) ? form.validate(data) : true
            if (!valid || (form.required && !data)) {
              this.valid = false
              this.formGroup(rIdx, fIdx).addClass('has-error')
            } else {
              this.formGroup(rIdx, fIdx).removeClass('has-error')
            }
          })
        })
        return this.valid
      },
      findModels (rows) {
        let models = []
        if (_.isArray(rows)) {
          _.forEach(rows, (row) => {
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
        _.forEach(_.uniq(this.findModels(this.formConfig)), (model) => {
          if (!_.has(this.formData, model)) {
            Object.defineProperty(this.formData, model, {
              configurable: true,
              enumerable: true,
              get: () => _.get(this.data, model),
              set: (v) => _.vueSet(this.data, model, v)
            })
          }
        })
      },
      reset () {
        this.data = _.merge({}, this.resetData)
      }
    },
    created () {
      this.uuid = `form_${Date.now()}`
      this.resetData = _.merge({}, this.data)
      this.syncModelProps()
    },
    computed: {
      /*
      utils () {
        return Object.assign({
          setData: this.setData,
          clearData: this.clearData,
          validate: this.validate,
          data: this.data,
          config: Object.assign({}, this.config, { rows: this.formConfig }),
          localData: this.formData
        }, _)
      },
      */
      formConfig () {
        let rows = []
        _.forEach(this.config.rows, (row) => {
          if (row.type === 'include') {
            let newRows = _.isFunction(row.value) ? row.value(row, this) : row.value
            if (_.isArray(newRows)) {
              _.forEach(newRows, (r) => {
                rows.push(r)
              })
            }
          } else {
            rows.push(row)
          }
        })
        return rows
      },
      isBootstrapFormat () {
        return !this.config || !this.config.style || this.config.framework === 'bootstrap'
      }
    },
    data () {
      return {
        resetData: {},
        opMax: 50,
        opCount: 0,
        lastConfig: [],
        valid: true,
        touched: false,
        pauseWatch: false,
        formData: {},
        uuid: null,
        textTypes: [
          'text', 'email', 'password', 'number', 'search', 'url', 'tel'
        ],
        dateTypes: [
          'date', 'month', 'week', 'time', 'datetime', 'datetime-local'
        ],
        uiTypes: [
          'radio', 'checkbox', 'color', 'range'
        ],
        buttonTypes: [
          'button', 'submit'
        ],
        noTopLabel: [
          'checkbox',
          'button',
          'radio',
          'toggle',
          'select',
          'multiselect',
          'select2',
          'html'
        ]
      }
    },
    watch: {
      formConfig: {
        handler () {
          this.$nextTick(this.syncModelProps)
        },
        deep: true
      },
      data: {
        handler () {
          if (this.config.progress) {
            let progKey = this.config.progress === true ? '$$progress' : this.config.progress
            _.vueSet(this.data, progKey, this.calcProgress())
          }
        },
        deep: true
      }
    },
    props: {
      config: { type: Object, required: true },
      data: { twoWay: true, type: Object, required: true },
      width: {
        validator (val) {
          return (typeof val === 'number') || (typeof val === 'string')
        }
      }
    },
    events: {
      'fselect.error': function (event) {
        this.$dispatch('formation.error', _.merge({ from: 'fselect' }, event))
      }
    }
  }
</script>

<style>
  .formation {
    display: block;
  }
  .formation.formation-container {
    width: 100%;
    background: transparent;
  }
  .formation .form-group-autoheight > div {
    height: 100%;
    margin-bottom: 0px;
  }
  .formation .form-group-autoheight button {
    height: inherit;
  }
  .formation .no-vertical-spacing {
    margin-top: 0px;
    margin-bottom: 0px;
    padding-top: 0px;
    padding-bottom: 0px;
  }
  .formation .hidden {
    display: none;
  }
</style>
