import _ from 'lodash'
import { vueSet } from '../../common/util'

export function syncModelProps () {
  let models = _.map(_.get(this.config, 'forms'), 'model')
  _.forEach(models, (model) => {
    if (!_.has(this.formData, model)) {
      Object.defineProperty(this.formData, model, {
        configurable: true,
        get: () => _.get(this.value, model),
        set: (v) => vueSet(this.value, model, v)
      })
    }
  })
  _.forEach(Object.getOwnPropertyNames(this.formData), (prop) => {
    if (!_.includes(models, prop) && prop !== '__ob__') {
      _.set(this.formData, prop, undefined)
      delete this.formData[prop]
    }
  })
}

export default {
  syncModelProps
}
