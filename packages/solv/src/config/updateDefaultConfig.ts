import { homedir } from 'os'
import { DefaultConfigType } from './types'
import { SOLV4_CONFIG_FILE } from '@/config/constants'
import { readFile, writeFile } from 'fs/promises'
import { existsAsync } from '@skeet-framework/utils'
import DEFAULT_CONFIG from './defaultConfig'

export const updateDefaultConfig = async (
  config: Partial<DefaultConfigType>,
) => {
  // update ~/solv4.config.json with new values
  const homeDir = homedir()
  const solvConfigFile = `${homeDir}/${SOLV4_CONFIG_FILE}`

  // Check if the file exists
  if (!(await existsAsync(solvConfigFile))) {
    // create default config
    console.log('Creating default config file at', solvConfigFile)
    await writeFile(solvConfigFile, JSON.stringify(DEFAULT_CONFIG, null, 2))
  }

  const solvConfig = JSON.parse(
    await readFile(solvConfigFile, 'utf8'),
  ) as DefaultConfigType
  // unique values
  const updatedConfig: DefaultConfigType = {
    ...solvConfig,
    ...config,
  }
  const updatedConfigString = JSON.stringify(updatedConfig, null, 2)
  await writeFile(solvConfigFile, updatedConfigString)
}
