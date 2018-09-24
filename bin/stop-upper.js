#!/usr/bin/env node

const debug = require('debug')('stop-upper')
const globby = require('globby')
const { filter, flatten, uniq } = require('ramda')

const argv = require('minimist')(process.argv.slice(2), {
  string: ['folder', 'skip', 'exclude'],
  boolean: 'warn',
  alias: {
    warn: 'w',
    folder: 'f',
    skip: 's',
    exclude: 'e'
  }
})

if (debug.enabled) {
  console.log('stop-upper arguments')
  console.log(argv)
}

if (!argv.folder || !argv.folder.length) {
  console.error(
    '🔥 stop-upper: pass at least a single folder with --folder, -f argument'
  )
  process.exit(1)
}

const toArray = x => (Array.isArray(x) ? x : [x])

const normalizeStrings = listOrString => {
  const strings = toArray(listOrString)
  // ? can we just split and flatten result array?
  let normalized = []
  strings.forEach(s => {
    if (s === undefined || s === null) {
      return
    }

    if (s.includes(',')) {
      normalized = normalized.concat(s.split(','))
    } else {
      normalized.push(s)
    }
  })
  return normalized
}

// user should be able to pass multiple folders with single argument separated by commas
// like "--folder foo,bar,baz"
// next code block splits these arguments and normalizes everything into list of strings
const splitFolders = normalizeStrings(argv.folder)
debug('split folders', splitFolders)

const folders = flatten(splitFolders)

if (debug.enabled) {
  console.log('stop only in folders')
  console.log(folders)
}

const searchFinished = foundUpperCaseFilename => {
  if (foundUpperCaseFilename.length === 0) {
    debug('could not find upper case filenames')
    process.exit(0)
  }

  // found uppercase filename somewhere
  if (argv.warn) {
    console.log('⚠️ Found uppercase filenames')
    console.log(foundUpperCaseFilename.join('\n'))
    process.exit(0)
  } else {
    console.log('Found uppercase filenames 👎')
    console.log(foundUpperCaseFilename.join('\n'))
    process.exit(1)
  }
}

const hasUpper = s => s.match(/[A-Z]/)

const onError = e => {
  console.error(e.message)
  process.exit(1)
}

globby(folders)
  .then(flatten)
  .then(filter(hasUpper))
  .then(uniq)
  .then(searchFinished)
  .catch(onError)
