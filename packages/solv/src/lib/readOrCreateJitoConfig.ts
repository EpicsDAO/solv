import { FILES } from '@/config/config'
import { JITO_CONFIG, JitoConfig } from '@/config/jitConfig'
import { existsAsync } from '@skeet-framework/utils'
import { readFile, writeFile } from 'fs/promises'
import os from 'os'
import path from 'path'

export const readOrCreateJitoConfig = async () => {
  const homeDir = os.homedir()
  const configPath = path.join(homeDir, FILES.JITO_CONFIG)
  if (!(await existsAsync(configPath))) {
    await writeFile(configPath, JSON.stringify(JITO_CONFIG, null, 2))
    console.log(`Created jito config file at ${configPath}`)
  }
  let config: JitoConfig
  try {
    config = JSON.parse(await readFile(configPath, 'utf-8')) as JitoConfig
  } catch (error) {
    console.log(`readOrCreateJitoConfig - ${error}`)
    await writeFile(configPath, JSON.stringify(JITO_CONFIG, null, 2))
    config = JITO_CONFIG
  }
  return config
}
