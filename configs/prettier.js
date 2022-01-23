module.exports = {
  trailingComma: 'all',
  tabWidth: 2,
  semi: false,
  singleQuote: true,
  importOrder: [
    '\\.\\.?\\/(?!styles\\.m\\.styl$)',
    '\\.\\/styles',
    '.+?\\.svg',
    '~\\/api',
  ],
  importOrderSeparation: true,
  importOrderParserPlugins: [
    'jsx',
    'typescript',
    'classProperties',
    'decorators-legacy',
  ],
}
