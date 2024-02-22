import { FILES } from '@/config/config'
import { JITO_CONFIG, JitoConfig } from '@/config/jitConfig'
import { existsSync, readFileSync, writeFileSync } from 'fs'
import os from 'os'
import path from 'path'

export const readOrCreateJitoConfig = (params?: JitoConfig) => {
  const homeDir = os.homedir()
  const configPath = path.join(homeDir, FILES.JITO_CONFIG)
  if (!existsSync(configPath)) {
    writeFileSync(configPath, JSON.stringify(JITO_CONFIG, null, 2))
    console.log(`Created jito config file at ${configPath}`)
  }
  let config: JitoConfig
  try {
    config = JSON.parse(readFileSync(configPath, 'utf-8')) as JitoConfig
  } catch (error) {
    console.log(`readOrCreateJitoConfig - ${error}`)
    writeFileSync(configPath, JSON.stringify(JITO_CONFIG, null, 2))
    config = JITO_CONFIG
  }
  return config
}
