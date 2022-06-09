#! /usr/bin/env node

const fs = require('fs-extra')
const path = require('path')
const { spawn } = require('child_process')
const inquirer = require('inquirer')

const main = async () => {
  const packageJson = JSON.parse(
    fs.readFileSync(
      path.join(
        process.cwd(),
        'node_modules',
        '@nikifilini/codestyle',
        'package.json',
      ),
      'utf-8',
    ),
  )
  const targetPackageJson = fs.readJSONSync(
    path.join(process.cwd(), 'package.json'),
  )

  const deps = [
    ...Object.entries(packageJson.peerDependencies),
    ['@nikifilini/codestyle', 'latest'],
  ]
    .filter(([name]) => !(name in targetPackageJson.devDependencies))
    .map(([name, ver]) => name + '@' + ver)

  const answers = await inquirer.prompt([
    { type: 'confirm', name: 'yarn', message: 'Run yarn?' },
    { type: 'confirm', name: 'prettier', message: 'Add .prettierrc.js?' },
    { type: 'confirm', name: 'eslint', message: 'Add .eslintrc.js?' },
    {
      type: 'list',
      choices: ['Node', 'React'],
      message: 'ESLint config type',
      name: 'eslint_type',
      when: (answers) => {
        return answers.eslint
      },
    },
    {
      type: 'confirm',
      name: 'scripts',
      message: 'Add format and lint scripts to package.json?',
    },
  ])

  if (answers.scripts) {
    if (!('scripts' in targetPackageJson)) targetPackageJson.scripts = {}
    targetPackageJson.scripts.format = 'prettier src --write'
    targetPackageJson.scripts.lint = 'eslint src --fix'
    await fs.writeJSON(
      path.join(process.cwd(), 'package.json'),
      targetPackageJson,
    )
  }

  if (answers.prettier) {
    await fs.writeFileSync(
      '.prettierrc.js',
      "const merge = require('@nikifilini/codestyle/tools')\nmodule.exports = merge(require('@nikifilini/codestyle/configs/prettier'), {})",
    )
  }

  if (answers.eslint) {
    const type = answers.eslint_type === 'React' ? 'react' : 'node'
    await fs.writeFileSync(
      '.eslintrc.js',
      `const merge = require('@nikifilini/codestyle/tools')\nmodule.exports = merge(require('@nikifilini/codestyle/configs/eslint/${type}'), {})`,
    )
  }

  if (answers.yarn) {
    const yarnReleasesPath = path.join(process.cwd(), '.yarn', 'releases')
    const hasYarnDir = fs.existsSync(yarnReleasesPath)
    if (hasYarnDir) {
      const files = fs.readdirSync(yarnReleasesPath)
      const yarnExec = files[0]
      console.log('Running yarn')
      spawn(
        'node',
        [path.join(yarnReleasesPath, yarnExec), 'add', '-D', ...deps],
        {
          stdio: 'inherit',
        },
      )
    } else {
      console.log()
      console.log('YARN NOT DETECTED')
      console.log('\x1b[33m%s\x1b[0m', 'INSTALL DEPENDENCIES WITH:')
      console.log('\x1b[2m%s\x1b[0m %s', 'yarn add -D', deps.join(' '))
      console.log()
    }
  }
}
main()
