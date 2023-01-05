import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

import utils from 'node-package-utilities'

export const packageName = 'imagemin'
// export const configName = 'images'

export const plugins = await utils.value.fromConfig(`${packageName}-plugins`)

export const packageConfig = await utils.value.fromConfig(packageName)

// NOTE: default plugins merge
export const config = Object.assign(
  {},
  packageConfig.plugins
    ? {}
    : { plugins },
  packageConfig,
)

// export const packageConfig = await utils.value.fromConfig(packageName)
// export const kitConfig = await utils.value.fromConfig('kit-config')
//
// export const config = Object.assign(
//   {},
//   kitConfig && kitConfig[configName]
//     ? kitConfig[configName]
//     : {},
//   packageConfig,
// )

export const argv = yargs(process.argv.slice(2))
  .config(config || {})
  .option('cwd', {
    alias: 'c',
    description: 'Current Working Directory',
    default: '',
    demandOption: false
  })
  .option('src', {
    alias: 's',
    description: 'Source Directory',
    demandOption: true
  })
  .option('dest', {
    alias: 'd',
    description: 'Dest Directory',
    demandOption: true
  })
  .option('webp', {
    description: 'replace .webp',
    default: '\.(jpg|png)$',
    demandOption: false
  })
  .option('ignore', {
    alias: 'ig',
    description: 'Ignore Directory',
    default: '{**/_*,node_modules/**/*}',
    demandOption: false
  })
  .help()
  .argv

export default argv
