import {
  CONFIG_TYPE,
  FILES,
  HOME_PATHS,
  PartialConfigType,
} from '@/config/config'
import { JitoConfig } from '@/config/jitConfig'
import { readFileSync, writeFileSync } from 'fs'
import os from 'os'

export const updateJitoSolvConfig = (config: Partial<JitoConfig>) => {
  // update ~/jito.config.json with new values
  const homeDir = os.homedir()
  const solvConfigFile = `${homeDir}/${FILES.JITO_CONFIG}`
  const solvConfig = JSON.parse(
    readFileSync(solvConfigFile, 'utf8'),
  ) as JitoConfig
  // unique values
  const updatedConfig: JitoConfig = {
    ...solvConfig,
    ...config,
  }
  const updatedConfigString = JSON.stringify(updatedConfig, null, 2)
  writeFileSync(solvConfigFile, updatedConfigString)
  console.log(`Updated ${solvConfigFile} with new values.`)
}
