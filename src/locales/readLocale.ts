import { LANGS } from '@/config/langs'
import cmdsEN from '@/locales/en/cmds'
import cmdsJA from '@/locales/ja/cmds'
import logsEN from '@/locales/en/logs'
import logsJA from '@/locales/ja/logs'
import { installerEN, installerSubEN } from '@/locales/en/installer'
import { installerJA, installerSubJA } from '@/locales/ja/installer'
import { LocaleParams } from '@/locales/localeParams'
import subCmdsEN from '@/locales/en/subCmds'
import subCmdsJA from '@/locales/ja/subCmds'

const readLocale = (lang: LANGS) => {
  let locales: LocaleParams = {
    cmds: cmdsEN,
    subCmds: subCmdsEN,
    logs: logsEN,
    installer: installerEN,
    installerSub: installerSubEN,
  }
  switch (lang) {
    case LANGS.EN:
      locales = {
        cmds: cmdsEN,
        subCmds: subCmdsEN,
        logs: logsEN,
        installer: installerEN,
        installerSub: installerSubEN,
      }
      break
    case LANGS.JA:
      locales = {
        cmds: cmdsJA,
        subCmds: subCmdsJA,
        logs: logsJA,
        installer: installerJA,
        installerSub: installerSubJA,
      }
      break
    default:
      locales = {
        cmds: cmdsEN,
        subCmds: subCmdsEN,
        logs: logsEN,
        installer: installerEN,
        installerSub: installerSubEN,
      }
  }
  return locales
}

export default readLocale
