import _ from 'lodash'
import Framework from './index'
import { createVueElement } from '../common'

const BUTTON_CLASS = {
  default: 'btn-default',
  primary: 'btn-primary',
  success: 'btn-success',
  info: 'btn-info',
  warning: 'btn-warning',
  danger: 'btn-danger',
  link: 'btn-link'
}

export default function container (component, createElement) {
  let defaults = { class: { btn: true } }
  let type = _.get(component, 'config.type', 'default')
  if (!_.includes(_.keys(BUTTON_CLASS), type)) type = 'default'
  _.set(defaults, 'class["btn-default"]', BUTTON_CLASS[type])

  return createVueElement({
    Framework,
    component,
    tag: 'button',
    defaults,
    createElement
  })
}
