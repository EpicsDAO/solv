import { homedir } from 'os'
import { DefaultConfigType } from './types'
import { SOLV_CONFIG_FILE } from '@/config/constants'
import { readFile, writeFile } from 'fs/promises'

export const updateDefaultConfig = async (
  config: Partial<DefaultConfigType>,
) => {
  // update ~/solv.config.json with new values
  const homeDir = homedir()
  const solvConfigFile = `${homeDir}/${SOLV_CONFIG_FILE}`
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
