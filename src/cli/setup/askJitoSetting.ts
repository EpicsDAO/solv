import { JITO_CONFIG, JITO_REGIONS } from '@/config/jitConfig'
import inquirer from 'inquirer'

export type JitoSetting = {
  version: string
  commissionBps: number
  blockEngineUrl: string
  relayerUrl: string
  shredReceiverAddr: string
}

export const askJitoSetting = async () => {
  const commissionBps = 1000
  const jitRegions = Object.keys(JITO_REGIONS)
  const answer = await inquirer.prompt<{
    commissionBps: number
    region: string
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
  ])
  const regionKey = answer.region as keyof typeof JITO_REGIONS
  const regionArgs = JITO_REGIONS[regionKey]
  const result = {
    version: JITO_CONFIG.version,
    commissionBps: answer.commissionBps,
    blockEngineUrl: regionArgs.BLOCK_ENGINE_URL,
    relayerUrl: regionArgs.RELAYER_URL,
    shredReceiverAddr: regionArgs.SHRED_RECEIVER_ADDR,
  } as JitoSetting
  return result
}
