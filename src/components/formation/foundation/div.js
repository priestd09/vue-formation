import Framework from './index'
import { createVueElement } from '../common'

export default function container (component, createElement) {
  return createVueElement({
    Framework,
    component,
    tag: 'div',
    defaults: {},
    createElement
  })
}
