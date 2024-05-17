import { JITO_CONFIG, JITO_REGIONS, JitoConfig } from '@/config/jitConfig'
import inquirer from 'inquirer'

export const askJitoSetting = async () => {
  const commissionBps = 1000
  const jitRegions = Object.keys(JITO_REGIONS)
  const answer = await inquirer.prompt<{
    commissionBps: number
    region: string
    isRelayer: boolean
  }>([
    {
      name: 'commissionBps',
      type: 'number',
      message: 'Enter commission bps',
      default: commissionBps,
    },
    {
      name: 'region',
      type: 'list',
      message: 'Select region',
      choices: jitRegions,
    },
    {
      name: 'isRelayer',
      type: 'confirm',
      message:
        'Do you want to setup Relayer Also?(※This requires more than 512GB RAM)',
      default: false,
    },
  ])
  const regionKey = answer.region as keyof typeof JITO_REGIONS
  const regionArgs = JITO_REGIONS[regionKey]
  const result = {
    version: JITO_CONFIG.version,
    tag: JITO_CONFIG.tag,
    commissionBps: answer.commissionBps,
    blockEngineUrl: regionArgs.BLOCK_ENGINE_URL,
    relayerUrl: regionArgs.RELAYER_URL,
    shredReceiverAddr: regionArgs.SHRED_RECEIVER_ADDR,
    hasRelayer: answer.isRelayer,
  } as JitoConfig

  return result
}
