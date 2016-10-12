import _ from 'lodash'
import Bootstrap from './index'
import { bootstrapConfig, mergeClassObj } from '../../lib'

export default function container (config, createElement) {
  let { components, settings } = bootstrapConfig(config)

  return createElement('div', {
    class: mergeClassObj(settings.class, { container: true }),
    style: settings.style
  }, _.map(components, (cfg, type) => Bootstrap[type](cfg, createElement)))
}
