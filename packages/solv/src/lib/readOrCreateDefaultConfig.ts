import { CONFIG, CONFIG_TYPE, FILES } from '@/config/config'
import { LocaleParams } from '@/locales/localeParams'
import readLocale from '@/locales/readLocale'
import { existsSync, readFileSync, writeFileSync } from 'fs'
import { updateSolvConfig } from './updateSolvConfig'
import { homedir } from 'os'

export type ConfigParams = {
  config: CONFIG_TYPE
  locale: LocaleParams
}

export const readOrCreateDefaultConfig = () => {
  const homeDir = homedir()
  const configPath = `${homeDir}/${FILES.CONFIG}`
  if (!existsSync(configPath)) {
    writeFileSync(configPath, JSON.stringify(CONFIG, null, 2))
    console.log(`Created default config file at ${configPath}`)
  }
  let config: CONFIG_TYPE
  try {
    config = JSON.parse(readFileSync(configPath, 'utf-8')) as CONFIG_TYPE
  } catch (error) {
    console.log('Error parsing config file. Renewing config file.')
    writeFileSync(configPath, JSON.stringify(CONFIG, null, 2))
    config = CONFIG
  }
  const locale = readLocale(config.LANG)
  // Set default RPC_URL if not set
  if (!config.RPC_URL) {
    config.RPC_URL = CONFIG.RPC_URL
    updateSolvConfig({ RPC_URL: CONFIG.RPC_URL })
  }

  // Set IS_MEV_MODE to false if not set
  if (config.IS_MEV_MODE === undefined) {
    config.IS_MEV_MODE = false
    updateSolvConfig({ IS_MEV_MODE: false })
  }

  // Set DISCORD_WEBHOOK_URL to empty string if not set
  if (!config.DISCORD_WEBHOOK_URL) {
    config.DISCORD_WEBHOOK_URL = ''
    updateSolvConfig({ DISCORD_WEBHOOK_URL: '' })
  }
  return { config, locale } as ConfigParams
}
