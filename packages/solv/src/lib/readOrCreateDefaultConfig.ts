import { CONFIG, CONFIG_TYPE, FILES } from '@/config/config'
import { LocaleParams } from '@/locales/localeParams'
import readLocale from '@/locales/readLocale'
import { existsSync, readFileSync, writeFileSync } from 'fs'
import getHomeDir from './getHomeDir'

export type ConfigParams = {
  config: CONFIG_TYPE
  locale: LocaleParams
}

export const readOrCreateDefaultConfig = () => {
  const homeDir = getHomeDir()
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
  return { config, locale } as ConfigParams
}
