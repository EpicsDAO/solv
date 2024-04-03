import { FILES } from '@/config/config'
import { JitoConfig } from '@/config/jitConfig'
import { readFile, writeFile } from 'fs/promises'
import os from 'os'

export const updateJitoSolvConfig = async (config: Partial<JitoConfig>) => {
  // update ~/jito.config.json with new values
  const homeDir = os.homedir()
  const solvConfigFile = `${homeDir}/${FILES.JITO_CONFIG}`
  const solvConfig = JSON.parse(
    await readFile(solvConfigFile, 'utf8'),
  ) as JitoConfig
  // unique values
  const updatedConfig: JitoConfig = {
    ...solvConfig,
    ...config,
  }
  const updatedConfigString = JSON.stringify(updatedConfig, null, 2)
  await writeFile(solvConfigFile, updatedConfigString)
  console.log(`Updated ${solvConfigFile} with new values.`)
}
