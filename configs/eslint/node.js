const base = require('./base')
const merge = require('../../tools')

const nodeConfig = {
  env: {
    node: true,
  },
}

const config = merge(base, nodeConfig)

module.exports = config
