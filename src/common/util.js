import Vue from 'vue'
import _ from 'lodash'

export function vueSet (obj, path, val) {
  let value = obj
  let fields = _.isArray(path) ? path : _.toPath(path)
  for (let f in fields) {
    let idx = Number(f)
    let p = fields[idx]
    if (idx === fields.length - 1) Vue.set(value, p, val)
    else if (!value[p]) Vue.set(value, p, _.isNumber(p) ? [] : {})
    value = value[p]
  }
}

export default {
  vueSet
}
