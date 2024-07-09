import { updateSolvConfig } from '@/lib/updateSolvConfig'
import inquirer from 'inquirer'
import { validateSolanaKey } from '../transfer'
import { ConfigParams } from '@/lib/readOrCreateDefaultConfig'
import hasEpochTimer from '../cron/hasEpochTimer'
import removeCronJob from '../cron/removeCronJob'
import chalk from 'chalk'

type MevOnParam1 = {
  mevOn: boolean
}
type MevOnAutoParam = {
  autoUpdate: boolean
  autoRestart: boolean
}

type MevOnParam2 = {
  rpcUrl: string
  harvestAddress: string
  discordWebhookUrl: string
}

const mevOn = async (solvConfig: ConfigParams) => {
  const ask = await inquirer.prompt<MevOnParam1>([
    {
      type: 'confirm',
      name: 'mevOn',
      message: 'Do you want to enable solv MEV Mode?(You can change it again)',
      default: false,
    },
  ])
  if (!ask.mevOn) {
    const hasCron = await hasEpochTimer()
    if (hasCron) {
      // Delete the cron job
      await removeCronJob()
    }
    updateSolvConfig({
      IS_MEV_MODE: ask.mevOn,
      AUTO_UPDATE: false,
      AUTO_RESTART: false,
    })
    return false
  }
  const autoText = `✨ About Auto Update & Restart ✨
${chalk.green('No more Login to the server to update 🌱')}

If you enable this, solv will update automatically when the solv/solana version is updated.

AUTO UPDATE: If you enable this, solv will update automatically when the solv version is updated.

AUTO RESTART: If you enable this, solv will restart automatically when the solana version is updated.
※ Please turn off if you are using no-downtime migration.
`
  console.log(chalk.white(autoText))
  const askIfAuto = await inquirer.prompt<MevOnAutoParam>([
    {
      type: 'confirm',
      name: 'autoUpdate',
      message: 'Do you want to enable AUTO UPDATE? (Recommended)',
      default: false,
    },
    {
      type: 'confirm',
      name: 'autoRestart',
      message: 'Do you want to enable AUTO RESTART?',
      default: false,
    },
  ])
  const harvestAddress =
    solvConfig.config.HARVEST_ACCOUNT === ''
      ? 'Enter your Harvest Address'
      : solvConfig.config.HARVEST_ACCOUNT
  const ask2 = await inquirer.prompt<MevOnParam2>([
    {
      type: 'input',
      name: 'rpcUrl',
      message: 'Enter your RPC URL',
      default: solvConfig.config.RPC_URL,
    },
    {
      type: 'input',
      name: 'harvestAddress',
      message: 'Enter your Harvest Address',
      default: harvestAddress,
      validate: validateSolanaKey,
    },
    {
      type: 'input',
      name: 'discordWebhookUrl',
      message: 'Enter your Discord Webhook URL',
      default: solvConfig.config.DISCORD_WEBHOOK_URL,
    },
  ])
  updateSolvConfig({
    HARVEST_ACCOUNT: ask2.harvestAddress,
    IS_MEV_MODE: ask.mevOn,
    RPC_URL: ask2.rpcUrl,
    DISCORD_WEBHOOK_URL: ask2.discordWebhookUrl,
    AUTO_UPDATE: askIfAuto.autoUpdate,
    AUTO_RESTART: askIfAuto.autoRestart,
  })
  return true
}

export default mevOn
