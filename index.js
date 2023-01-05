#!/usr/bin/env node

'use strict'

/* @author ysknk */

import path from 'path'
import glob from 'glob'

import imagemin from 'imagemin'

import utils from 'node-package-utilities'

import { argv, packageName } from './lib/arguments.js'

utils.time.initializeProcess()

let processCount = 0
let successCount = 0

let total = {
  size: {
    before: 0,
    after: 0
  }
}

const savedObj = (before, after) => {
  const saved = (100 - (((after) / before) * 100))
  const per = `${((saved || 0).toFixed(2))}%`
  const size = utils.file.formatBytes(before - after)
  return {
    per,
    size,
    text: `(saved ${size} - ${per})`
  }
}

const webpRegExp = new RegExp(argv.webp, 'i')

glob.sync(argv.src, {
  ignore: argv.ignore,
  cwd: argv.cwd
}).map((key, i, files) => {
  // console.log(key, i, files.length - 1)
  const filename = key.replace(/\.[^/.]+$/, '')
  const filepath = path.resolve(argv.cwd, key)

  utils.message.processing(`${packageName}: ${argv.cwd}${key}`)

  ;(async () => {
    const input = path.resolve(filepath)
    const formatKey = key.replace(webpRegExp, '.webp')
    const output = path.resolve(
      path.join(process.cwd(),
      `${argv.dest}${formatKey}`)
    )

    const file = await imagemin([ filepath ], {
      destination: path.dirname(output),
      plugins: argv.plugins,
    })

    // NOTE: console file size
    try {
      const before = await utils.file.stats(input)
      const after = await utils.file.stats(output)

      total.size.before += before.stat.size || 0
      total.size.after += after.stat.size || 0

      const saved = savedObj(before.stat.size, after.stat.size)

      utils.message.success([
        `${packageName}:`,
        `${argv.dest}${formatKey}`,
        `${utils.color.colors.brightBlack(after.size)}`,
        `${utils.color.colors.brightBlack(saved.text)}`
      ].join(' '), {ptime: false})
      successCount++
    } catch (e) {
      console.log(e)
    }

    processCount++

    // NOTE: complete
    if (processCount > (files.length - 1)) {
      const totalSaved = savedObj(total.size.before, total.size.after)
      utils.message.success(utils.color.colors.brightBlack([
        `Minified`,
        `${successCount}/${processCount}`,
        `image`,
        `${totalSaved.text}`
      ].join(' ')), {ptime: false})
    }
  })()
})
