/* lodash like functions to remove dependency on lodash */
import Vue from 'vue'

export function isFunction (obj) {
  return typeof obj === 'function'
}

export function isString (obj) {
  return typeof obj === 'string'
}

export function isNumber (obj) {
  return typeof obj === 'number'
}

export function isArray (obj) {
  return Array.isArray(obj)
}

export function ensureArray (obj) {
  return !obj ? [] : isArray(obj) ? obj : [obj]
}

export function isBoolean (obj) {
  return typeof obj === 'boolean'
}

export function isDate (obj) {
  return obj instanceof Date
}

export function isObject (obj) {
  return typeof obj === 'object' && obj !== null
}

export function isHash (obj) {
  return isObject(obj) && !isArray(obj) && !isDate(obj) && obj !== null
}
export function toString (obj) {
  try {
    if (isHash(obj) || isArray(obj)) return JSON.stringify(obj)
    else if (has(obj, 'toString')) return obj.toString()
    else return String(obj)
  } catch (err) {}
  return ''
}

// taken from lodash - https://github.com/lodash/lodash
export function escapeRegExp (str) {
  var reRegExpChar = /[\\^$.*+?()[\]{}|]/g
  var reHasRegExpChar = RegExp(reRegExpChar.source)
  str = toString(str)
  return (str && reHasRegExpChar.test(str))
    ? str.replace(reRegExpChar, '\\$&')
    : str
}

export function includes (obj, key) {
  try {
    return isArray(obj) && obj.indexOf(key) !== -1
  } catch (err) {
    return false
  }
}

export function contains (list, obj) {
  let found = false
  forEach(list, (item) => {
    if (item === obj) {
      found = true
      return false
    }
  })
  return found
}

export function uniq (list) {
  let newList = []
  forEach(list, (item) => {
    if (!contains(newList, item)) newList.push(item)
  })
  return newList
}

export function union () {
  let args = Array.prototype.slice.call(arguments)
  let newList = []
  forEach(args, (list) => {
    newList = newList.concat(list)
  })
  return uniq(newList)
}

export function keys (obj) {
  try {
    return Object.keys(obj)
  } catch (err) {
    return []
  }
}

export function capitalize (str) {
  if (isString(str) && str.length > 0) {
    let first = str[0]
    let rest = str.length > 1 ? str.substring(1) : ''
    str = [first.toUpperCase(), rest.toLowerCase()].join('')
  }
  return str
}

export function stringToPathArray (pathString) {
  // taken from lodash - https://github.com/lodash/lodash
  let pathRx = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(\.|\[\])(?:\4|$))/g
  let pathArray = []

  if (isString(pathString)) {
    pathString.replace(pathRx, function (match, number, quote, string) {
      pathArray.push(quote ? string : (number !== undefined) ? Number(number) : match)
      return pathArray[pathArray.length - 1]
    })
  }
  return pathArray
}

export function has (obj, path) {
  let value = obj
  let fields = isArray(path) ? path : stringToPathArray(path)
  if (fields.length === 0) return false
  try {
    for (let f in fields) {
      if (!value[fields[f]]) return false
      else value = value[fields[f]]
    }
  } catch (err) {
    return false
  }
  return true
}

export function forEach (obj, fn) {
  try {
    if (Array.isArray(obj)) {
      let idx = 0
      for (let val of obj) {
        if (fn(val, idx) === false) break
        idx++
      }
    } else {
      for (const key in obj) {
        if (fn(obj[key], key) === false) break
      }
    }
  } catch (err) {
    return
  }
}

export function without () {
  let output = []
  let args = Array.prototype.slice.call(arguments)
  if (args.length === 0) return output
  else if (args.length === 1) return args[0]
  let search = args.slice(1)
  forEach(args[0], function (val) {
    if (!includes(search, val)) output.push(val)
  })
  return output
}

export function map (obj, fn) {
  let output = []
  try {
    for (const key in obj) {
      output.push(fn(obj[key], key))
    }
  } catch (err) {
    return []
  }
  return output
}

export function mapValues (obj, fn) {
  let newObj = {}
  try {
    forEach(obj, function (v, k) {
      newObj[k] = fn(v)
    })
  } catch (err) {
    return obj
  }
  return newObj
}

export function filter (obj, fn) {
  let newObj = []
  if (!isArray(obj)) return newObj
  forEach(obj, function (v, k) {
    if (fn(v, k)) newObj.push(v)
  })
  return newObj
}

export function find (obj, fn, def) {
  let found = def || null
  forEach(obj, function (v, k) {
    if (fn(v, k)) {
      found = v
      return false
    }
  })
  return found
}

export function omitBy (obj, fn) {
  let newObj = {}
  if (!isHash(obj)) return newObj
  forEach(obj, function (v, k) {
    if (!fn(v, k)) newObj[k] = v
  })
  return newObj
}

export function pickBy (obj, fn) {
  let newObj = {}
  if (!isHash(obj)) return newObj
  forEach(obj, function (v, k) {
    if (fn(v, k)) newObj[k] = v
  })
  return newObj
}

export function get (obj, path, defaultValue) {
  let value = obj
  let fields = isArray(path) ? path : stringToPathArray(path)
  if (fields.length === 0) return defaultValue

  try {
    for (let f in fields) {
      if (!value[fields[f]]) return defaultValue
      else value = value[fields[f]]
    }
  } catch (err) {
    return defaultValue
  }
  return value
}

export function set (obj, path, val) {
  let value = obj
  let fields = isArray(path) ? path : stringToPathArray(path)
  for (let f in fields) {
    let idx = Number(f)
    let p = fields[idx]
    if (idx === fields.length - 1) value[p] = val
    else if (!value[p]) value[p] = isNumber(p) ? [] : {}
    value = value[p]
  }
}

export function vueSet (obj, path, val) {
  let value = obj
  let fields = isArray(path) ? path : stringToPathArray(path)
  for (let f in fields) {
    let idx = Number(f)
    let p = fields[idx]
    if (idx === fields.length - 1) Vue.set(value, p, val)
    else if (!value[p]) Vue.set(value, p, isNumber(p) ? [] : {})
    value = value[p]
  }
}

export function merge () {
  let args = Array.prototype.slice.call(arguments)
  if (args.length === 0) return {}
  else if (args.length === 1) return args[0]
  else if (!isHash(args[0])) return {}
  let targetObject = args[0]
  let sources = args.slice(1)

  //  define the recursive merge function
  let _merge = function (target, source) {
    for (let k in source) {
      if (!target[k] && isHash(source[k])) {
        target[k] = _merge({}, source[k])
      } else if (target[k] && isHash(target[k]) && isHash(source[k])) {
        target[k] = merge(target[k], source[k])
      } else {
        if (isArray(source[k])) {
          target[k] = []
          for (let x in source[k]) {
            if (isHash(source[k][x])) {
              target[k].push(_merge({}, source[k][x]))
            } else if (isArray(source[k][x])) {
              target[k].push(_merge([], source[k][x]))
            } else {
              target[k].push(source[k][x])
            }
          }
        } else if (isDate(source[k])) {
          target[k] = new Date(source[k])
        } else {
          target[k] = source[k]
        }
      }
    }
    return target
  }

  //  merge each source
  for (let k in sources) {
    if (isHash(sources[k])) _merge(targetObject, sources[k])
  }
  return targetObject
}
