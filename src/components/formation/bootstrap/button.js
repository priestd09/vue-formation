import _ from 'lodash'
import Bootstrap from './index'
import { bootstrapConfig, mergeClassObj } from '../../lib'

export default function container (config, createElement) {
  let { components, settings } = bootstrapConfig(config)
  let hasComponents = _.keys(components).length > 0

  return createElement('button', {
    class: mergeClassObj(settings.class, { btn: true }),
    style: settings.style
  }, hasComponents ? _.map(components, (cfg, type) => Bootstrap[type](cfg, createElement)) : 'OK')
}
