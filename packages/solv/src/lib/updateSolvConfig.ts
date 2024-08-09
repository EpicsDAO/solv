import { CONFIG_TYPE, FILES, PartialConfigType } from '@/config/config'
import { readFileSync, writeFileSync } from 'fs'
import { homedir } from 'os'

export const updateSolvConfig = (config: PartialConfigType) => {
  // update ~/solv.config.json with new values
  const homeDir = homedir()
  const solvConfigFile = `${homeDir}/${FILES.CONFIG}`
  const solvConfig = JSON.parse(
    readFileSync(solvConfigFile, 'utf8'),
  ) as CONFIG_TYPE
  // unique values
  const updatedConfig: CONFIG_TYPE = {
    ...solvConfig,
    ...config,
  }
  const updatedConfigString = JSON.stringify(updatedConfig, null, 2)
  writeFileSync(solvConfigFile, updatedConfigString)
}
