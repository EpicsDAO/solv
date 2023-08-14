import { readFileSync, writeFileSync } from 'fs'
import pjson from './package.json'
import * as fsPromise from 'fs/promises'

const CHANGE_LOG_PATH = './solv-debian/debian/changelog'
const VERSION_PATH = './src/lib/version.ts'

console.log(`updated version to ${pjson.version}`)

const versionString = `export const VERSION = '${pjson.version}'`

const fileWrite = () => {
  writeFileSync(VERSION_PATH, versionString, {
    flag: 'w',
  })
}

const changeLogWrite = () => {
  const file = readFileSync(CHANGE_LOG_PATH, 'utf8')
  const lines = file.split('\n')
  const firstLine = lines[0]
  const newFirstLine = firstLine.replace(/(\d+.\d+.\d+)/, pjson.version)
  const newLastLine = ` -- EpicsDAO <info@epics.dev>  ${new Date().toUTCString()}`
  lines[0] = newFirstLine
  lines[lines.length - 1] = newLastLine
  const newFile = lines.join('\n')
  writeFileSync(CHANGE_LOG_PATH, newFile, {
    flag: 'w',
  })
}

fileWrite()
changeLogWrite()
