const merge = require('./tools')
module.exports = merge(require('./configs/eslint/node'), {
  'no-console': 'off',
})
