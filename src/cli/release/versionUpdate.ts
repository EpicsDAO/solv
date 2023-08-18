import { writeFileSync } from 'fs'
const VERSION_PATH = './src/lib/version.ts'

export const versionUpdate = (version: string) => {
  const versionString = `export const VERSION = '${version}'`
  writeFileSync(VERSION_PATH, versionString, {
    flag: 'w',
  })
}
