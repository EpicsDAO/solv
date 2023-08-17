import { readFileSync, writeFileSync } from 'fs'
import pjson from './package.json'
import { format } from 'date-fns'

const VERSION_PATH = './src/lib/version.ts'

console.log(`updated version to ${pjson.version}`)

const versionString = `export const VERSION = '${pjson.version}'`

const fileWrite = () => {
  writeFileSync(VERSION_PATH, versionString, {
    flag: 'w',
  })
}

fileWrite()
