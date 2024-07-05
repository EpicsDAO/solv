import { updateSolvConfig } from '@/lib/updateSolvConfig'
import inquirer from 'inquirer'
import { validateSolanaKey } from '../transfer'

type MevOnParam1 = {
  mevOn: boolean
}

type MevOnParam2 = {
  rpcUrl: string
  harvestAddress: string
  discordWebhookUrl: string
}

const mevOn = async () => {
  const ask = await inquirer.prompt<MevOnParam1>([
    {
      type: 'confirm',
      name: 'mevOn',
      message: 'Do you want to enable solv MEV Mode?',
      default: false,
    },
  ])
  if (!ask.mevOn) {
    return false
  }
  const ask2 = await inquirer.prompt<MevOnParam2>([
    {
      type: 'input',
      name: 'rpcUrl',
      message: 'Enter your RPC URL',
      default: 'https://api.mainnet-beta.solana.com',
    },
    {
      type: 'input',
      name: 'harvestAddress',
      message: 'Enter your Harvest Address',
      default: 'Solana Wallet Address Here',
      validate: validateSolanaKey,
    },
    {
      type: 'input',
      name: 'discordWebhookUrl',
      message: 'Enter your Discord Webhook URL',
      default: 'https://discord.com/api/webhooks/11111111/xxxxxxxx',
    },
  ])
  updateSolvConfig({
    HARVEST_ACCOUNT: ask2.harvestAddress,
    IS_MEV_MODE: ask.mevOn,
    RPC_URL: ask2.rpcUrl,
    DISCORD_WEBHOOK_URL: ask2.discordWebhookUrl,
  })
  return true
}

export default mevOn
