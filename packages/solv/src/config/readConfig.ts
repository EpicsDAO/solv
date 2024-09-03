import { readFile, writeFile } from 'fs/promises'
import { SOLV4_CONFIG_FILE } from '@/config/constants'
import { existsAsync } from '@skeet-framework/utils'
import DEFAULT_CONFIG from '@/config/defaultConfig'
import { DefaultConfigType } from '@/config/types'
import { homedir } from 'os'

const readConfig = async () => {
  const homeDir = homedir()
  const configPath = `${homeDir}/${SOLV4_CONFIG_FILE}`
  if (!(await existsAsync(configPath))) {
    // create default config
    console.log('Creating default config file at', configPath)
    await writeFile(configPath, JSON.stringify(DEFAULT_CONFIG, null, 2))
    return DEFAULT_CONFIG
  }
  const config = JSON.parse(
    await readFile(configPath, 'utf-8'),
  ) as DefaultConfigType
  return config
}

export default readConfig
