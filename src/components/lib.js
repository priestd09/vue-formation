import _ from 'lodash'

export const CHILD_TYPES = {
  bootstrap: {
    button: 'button',
    container: 'container'
  }
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

export function splitConfig (framework, config) {
  let types = _.mapValues(CHILD_TYPES[framework])
  let out = { components: {}, settings: {} }
  _.forEach(config, (v, k) => {
    if (_.includes(types, k)) out.components[k] = v
    else out.settings[k] = v
  })
  return out
}

export function bootstrapConfig (config) {
  return splitConfig('bootstrap', config)
}

export function materialConfig (config) {
  return splitConfig('material', config)
}

export default {
  splitConfig,
  bootstrapConfig,
  materialConfig,
  mergeClassObj
}
