const base = require('./base')
const merge = require('../../tools')

const reactConfig = {
  env: {
    browser: true,
  },
  extends: ['plugin:react/recommended', 'prettier'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['react'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
    'react/jsx-key': 'error',
    'react/jsx-max-props-per-line': [
      2,
      {
        maximum: 10,
        when: 'multiline',
      },
    ],
  },
  settings: {
    react: {
      version: '16',
    },
  },
}

const config = merge(base, reactConfig)

module.exports = config
