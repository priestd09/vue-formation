import _ from 'lodash'
import Materialize from './index'
import { materializeConfig, mergeClassObj } from '../../lib'

export default function container (config, createElement) {
  let { components, settings } = materializeConfig(config)
  let hasComponents = _.keys(components).length > 0

  return createElement('button', {
    class: mergeClassObj(settings.class, { btn: true }),
    style: settings.style
  }, hasComponents ? _.map(components, (cfg, type) => Materialize[type](cfg, createElement)) : 'OK')
}
