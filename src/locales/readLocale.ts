import { LANGS } from '@/config/langs'
import cmdsEN from './en/cmds'
import cmdsJA from './ja/cmds'
import logsEN from './en/logs'
import logsJA from './ja/logs'
import installerEN from './en/installer'
import installerJA from './ja/installer'
import { LocaleParams } from './localeParams'
import subCmdsEN from './en/subCmds'
import subCmdsJA from './ja/subCmds'

const readLocale = (lang: LANGS) => {
  let locales: LocaleParams = {
    cmds: cmdsEN,
    subCmds: subCmdsEN,
    logs: logsEN,
    installer: installerEN,
  }
  switch (lang) {
    case LANGS.EN:
      locales = {
        cmds: cmdsEN,
        subCmds: subCmdsEN,
        logs: logsEN,
        installer: installerEN,
      }
      break
    case LANGS.JA:
      locales = {
        cmds: cmdsJA,
        subCmds: subCmdsJA,
        logs: logsJA,
        installer: installerJA,
      }
      break
    default:
      locales = {
        cmds: cmdsEN,
        subCmds: subCmdsEN,
        logs: logsEN,
        installer: installerEN,
      }
  }
  return locales
}

export default readLocale
