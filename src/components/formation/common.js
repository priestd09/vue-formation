import _ from 'lodash'
import { vueSet } from '../../common/util'

export function syncModelProps () {
  let forms = _.get(this.config, 'forms')
  let models = _.without(_.map(forms, 'model'), undefined)

  // remove properties that have no model map
  _.forEach(Object.getOwnPropertyNames(this.formData), (prop) => {
    if (!_.includes(models, prop) && prop !== '__ob__') {
      let idx = _.indexOf(this.forms, _.find(this.forms, { model: prop }))
      if (!isNaN(idx)) this.forms.splice(idx, 1)
      vueSet(this.value, prop, undefined)
      _.unset(this.value, prop)
    }
  })

  // clear the form mapper
  if (_.without(Object.getOwnPropertyNames(this.formData), '__ob__').length) vueSet(this, 'formData', {})

  // loop through each form and if it has a model add it to the forms array
  _.forEach(forms, (form, name) => {
    if (form && form.model) {
      let hasModel = _.find(this.forms, { model: form.model })
      if (!hasModel) this.forms.push(_.merge({ name }, form))
      if (!_.has(this.formData, form.model)) {
        Object.defineProperty(this.formData, form.model, {
          configurable: true,
          get: () => _.get(this.value, form.model),
          set: (v) => vueSet(this.value, form.model, v)
        })
      }
    }
  })
}

export default {
  syncModelProps
}
