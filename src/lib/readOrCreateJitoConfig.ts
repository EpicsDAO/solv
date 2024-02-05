import { FILES } from '@/config/config'
import { JitoConfig } from '@/config/jitConfig'
import { existsSync, readFileSync, writeFileSync } from 'fs'
import os from 'os'

export const readOrCreateJitoConfig = (params?: JitoConfig) => {
  const homeDir = os.homedir()
  const configPath = `${homeDir}/${FILES.JITO_CONFIG}`
  if (existsSync(configPath)) {
    const config = JSON.parse(readFileSync(configPath, 'utf-8')) as JitoConfig
    return config
  }
  if (!params) {
    throw new Error('Jito config not found')
  }
  writeFileSync(configPath, JSON.stringify(params, null, 2))
  const config = JSON.parse(readFileSync(configPath, 'utf-8')) as JitoConfig
  console.log(`Created jito config file at ${configPath}`)
  return config
}
