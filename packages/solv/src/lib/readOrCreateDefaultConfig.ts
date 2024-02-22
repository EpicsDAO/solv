import { CONFIG, CONFIG_TYPE, FILES, MT_PATHS } from '@/config/config'
import { LocaleParams } from '@/locales/localeParams'
import readLocale from '@/locales/readLocale'
import { existsSync, readFileSync, writeFileSync } from 'fs'
import os from 'os'
import { updateSolvConfig } from './updateSolvConfig'

export type ConfigParams = {
  config: CONFIG_TYPE
  locale: LocaleParams
}

export const readOrCreateDefaultConfig = () => {
  const homeDir = os.homedir()
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
  if (!config.LEDGER_PATH) {
    config.LEDGER_PATH = MT_PATHS.LEDGER
    console.log(
      'Default LEDGER_PATH is set to ~/solv.config.json\nPlease change it if necessary.',
    )
    updateSolvConfig({ LEDGER_PATH: MT_PATHS.LEDGER })
  }
  return { config, locale } as ConfigParams
}
