import _ from 'lodash'

export const TEXT_TYPES = ['input', 'text', 'email', 'password', 'number', 'search', 'url', 'tel']

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
      if (_.isFunction(cmp)) return cmp(c, createElement)
      return createElement(cmp)
    }), undefined) : undefined
  )
}

export function colWidths (columns, COL_LIMIT = 12) {
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

export function isTextType (type) {
  return _.includes(TEXT_TYPES, type)
}

export default {
  colWidths,
  mergeClassObj,
  createVueElement,
  isTextType
}
