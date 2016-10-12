import _ from 'lodash'
import { vueSet } from '../../common/util'

export const CHILD_TYPES = {
  button: 'button',
  container: 'div',
  div: 'div',
  ftable: 'ftable'
}

export function mergeClassObj (c, def = {}) {
  let obj = {}
  if (!_.isString(c) || !_.isObject(c) || !_.isArray(c)) c = {}
  c = _.isString(c) ? c.split(/\s+/) : c

  if (_.isArray(c)) {
    _.forEach(c, (name) => {
      obj[name] = true
    })
  } else {
    obj = c
  }
  return _.merge({}, def, obj)
}

export function splitConfig (config) {
  let types = _.mapValues(CHILD_TYPES)
  let out = { components: {}, settings: {} }
  _.forEach(config, (v, k) => {
    if (_.includes(types, k)) out.components[k] = v
    else out.settings[k] = v
  })
  return out
}

export function createVueElement (args) {
  let { Framework, createElement, component, tag, defaults } = args
  let components = _.get(component, 'components', [])
  let config = _.get(component, 'config', {})
  let hasComponents = components.length > 0

  let data = { class: mergeClassObj(config.class, _.get(defaults, 'class', {})) }
  if (config.style) data.style = config.style
  if (config.content) _.set(data, 'domProps.innerHTML', config.content)
  if (config.html) _.set(data, 'domProps.innerHTML', config.html)
  if (_.isObject(config.attrs)) data.attrs = config.attrs
  if (_.isFunction(config.onclick)) _.set(data, 'on.click', config.onclick)

  return createElement(
    CHILD_TYPES[tag],
    data,
    hasComponents ? _.without(_.map(components, (c) => {
      let cmp = Framework[c.type]
      return _.isFunction(cmp) ? cmp(c, createElement) : createElement(cmp)
    }), undefined) : undefined
  )
}

export function syncModelProps () {
  let forms = _.get(this.config, 'forms')
  let models = _.without(_.map(forms, 'model'), undefined)

  // remove properties that have no model map
  _.forEach(Object.getOwnPropertyNames(this.formData), (prop) => {
    if (!_.includes(models, prop) && prop !== '__ob__') {
      let idx = _.indexOf(this.forms, _.find(this.forms, { model: prop }))
      if (!isNaN(idx)) this.forms.splice(idx, 1)
      vueSet(this.value, prop, undefined)
      _.unset(this.value, prop)
    }
  })

  // clear the form mapper
  if (_.without(Object.getOwnPropertyNames(this.formData), '__ob__').length) vueSet(this, 'formData', {})

  // loop through each form and if it has a model add it to the forms array
  _.forEach(forms, (form, name) => {
    if (form && form.model) {
      let hasModel = _.find(this.forms, { model: form.model })
      if (!hasModel) this.forms.push(_.merge({ name }, form))
      if (!_.has(this.formData, form.model)) {
        Object.defineProperty(this.formData, form.model, {
          configurable: true,
          get: () => _.get(this.value, form.model),
          set: (v) => vueSet(this.value, form.model, v)
        })
      }
    }
  })
}

export default {
  syncModelProps,
  mergeClassObj,
  splitConfig,
  createVueElement
}
