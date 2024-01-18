import {
  CONFIG_TYPE,
  FILES,
  HOME_PATHS,
  PartialConfigType,
} from '@/config/config'
import { readFileSync, writeFileSync } from 'fs'

export const updateSolvConfig = (config: PartialConfigType) => {
  // update ~/solv.config.json with new values
  const solvConfigFile = `${HOME_PATHS.ROOT}/${FILES.CONFIG}`
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
  console.log(`Updated ${solvConfigFile} with new values.`)
}
