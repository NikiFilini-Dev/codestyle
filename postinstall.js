const fs = require('fs')

const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf-8'))
const deps = Object.keys(packageJson.peerDependencies)

console.log()
console.log('\x1b[33m%s\x1b[0m', 'INSTALL DEPENDENCIES WITH:')
console.log(`\x1b[2m%s\x1b[0m %s`, 'yarn add -D', deps.join(' '))
console.log()
