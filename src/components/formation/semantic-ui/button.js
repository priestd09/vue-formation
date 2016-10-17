import Framework from './index'
import { createVueElement } from '../common'

export default function container (component, createElement) {
  return createVueElement({
    Framework,
    component,
    tag: 'button',
    defaults: {
      class: {
        ui: true,
        button: true
      }
    },
    createElement
  })
}