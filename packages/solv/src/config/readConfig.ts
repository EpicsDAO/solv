import { readFile, writeFile } from 'fs/promises'
import { CONFIG, CONFIG_TYPE } from '@/config/config'
import { SOLV_CONFIG_FILE } from '@/config/constants'
import { existsAsync } from '@skeet-framework/utils'

const readConfig = async () => {
  const configPath = SOLV_CONFIG_FILE
  if (!(await existsAsync(configPath))) {
    // create default config
    console.log('Creating default config file at', configPath)
    await writeFile(configPath, JSON.stringify(CONFIG, null, 2))
    return CONFIG
  }
  const config = JSON.parse(await readFile(configPath, 'utf-8')) as CONFIG_TYPE
  return config
}

export default readConfig
