import _ from 'lodash'
import Materialize from './index'
import { materializeConfig, mergeClassObj } from '../../lib'

export default function container (config, createElement) {
  let { components, settings } = materializeConfig(config)

  return createElement('div', {
    class: mergeClassObj(settings.class, { container: true }),
    style: settings.style
  }, _.map(components, (cfg, type) => Materialize[type](cfg, createElement)))
}
