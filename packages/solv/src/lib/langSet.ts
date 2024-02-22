import { LANGS } from '@/config/langs'
import { updateSolvConfig } from './updateSolvConfig'
import inquirer from 'inquirer'

export const langSet = async () => {
  try {
    const choices = Object.values(LANGS)
    const askLang = await inquirer.prompt<{ lang: string }>([
      {
        name: 'lang',
        type: 'list',
        message: 'Select Language',
        choices,
      },
    ])
    updateSolvConfig({ LANG: askLang.lang as LANGS, LANG_SETUP: true })
    console.log(`✅ Language set to ${askLang.lang}`)
    return askLang.lang as LANGS
  } catch (error) {
    throw new Error(`langSet: ${error}`)
  }
}
