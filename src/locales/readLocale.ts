import { LANGS } from '@/config/langs'
import cmdsEN from './en/cmds'
import cmdsJA from './ja/cmds'
import logsEN from './en/logs'
import logsJA from './ja/logs'

const readLocale = (lang: LANGS) => {
  let locales = { cmds: cmdsEN, logs: logsEN }
  switch (lang) {
    case LANGS.EN:
      locales = { cmds: cmdsEN, logs: logsEN }
      break
    case LANGS.JA:
      locales = { cmds: cmdsJA, logs: logsJA }
      break
    default:
      locales = { cmds: cmdsEN, logs: logsEN }
  }
  return locales
}

export default readLocale
