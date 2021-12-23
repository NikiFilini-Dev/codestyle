const mergeWith = require('lodash.mergewith')

const customizer = (objValue, srcValue) => {
  if (Array.isArray(objValue)) {
    return objValue.concat(srcValue)
  }
}

module.exports = (a, b) => mergeWith(a, b, customizer)
