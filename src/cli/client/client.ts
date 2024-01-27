import { ConfigParams } from '@/lib/readOrCreateDefaultConfig'
import inquirer from 'inquirer'
import { Logger } from '@/lib/logger'
import { langSet } from '@/lib/langSet'
import chalk from 'chalk'
import { spawnSync } from 'child_process'
import { updateSolvConfig } from '@/lib/updateSolvConfig'
import { setupKeys } from '@/cli/setup/setupKeys'
import { upload } from '@/cli/scp/upload'
import { download } from '../scp/download'

export enum CLIENT_CHOICES {
  STATUS,
  KEY_DOWNLOAD,
  KEY_GENERATE,
  KEY_RESTORE,
  MULTIPLE_NODE_SETUP,
  UNINSTALL,
  EXIT,
}

export const client = async (solvConfig: ConfigParams) => {
  Logger.solvAA()
  const { logs, cmds, clientCmds } = solvConfig.locale
  const { config } = solvConfig
  if (!config.LANG_SETUP) {
    await langSet()
    updateSolvConfig({ IS_CLIENT: true })
    console.log(`Please run command again:\n\n${chalk.green('$ solv c')}`)
    return
  }
  if (!config.IS_CLIENT) {
    console.log(
      chalk.yellow(
        `⚠️ Please run solv client from the your local machine, not from the validator server`,
      ),
    )
    return
  }
  const msg = Logger.warningHex(logs.installer.welcomeMsg)
  console.log(msg + '\n')

  // Put increment number in front of each item
  const choices = clientCmds.map((item, index) => {
    return `${index + 1}${item}`
  })
  const answer = await inquirer.prompt<{ server: string }>([
    {
      name: 'server',
      type: 'list',
      message: cmds.installer,
      choices,
    },
  ])

  const selectedOption = (Number(answer.server.split(')')[0]) -
    1) as CLIENT_CHOICES
  switch (selectedOption) {
    case CLIENT_CHOICES.STATUS:
      console.log('Coming soon...')
      break
    case CLIENT_CHOICES.KEY_DOWNLOAD:
      download()
      break
    case CLIENT_CHOICES.KEY_GENERATE:
      setupKeys(solvConfig)
      break
    case CLIENT_CHOICES.KEY_RESTORE:
      upload()
      break
    case CLIENT_CHOICES.MULTIPLE_NODE_SETUP:
      console.log('Coming soon...')
      break
    case CLIENT_CHOICES.UNINSTALL:
      spawnSync('npm -g uninstall @epics-dao/solv', {
        shell: true,
        stdio: 'inherit',
      })
      break
    case CLIENT_CHOICES.EXIT:
      break
  }
}
