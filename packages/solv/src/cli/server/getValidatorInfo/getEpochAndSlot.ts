import { getEpoch } from '@/cli/cron/getEpoch'
import { getSlot } from '@/cli/cron/getSlot'
import chalk from 'chalk'

export const getEpochAndSlot = () => {
  const epoch = getEpoch()
  const slot = getSlot()
  const title = chalk.white('===== Current Epoch and Slot =====')
  const epochStr = chalk.green(`epoch: ${epoch}`)
  const slotStr = chalk.green(`slot: ${slot}`)
  const endLine = chalk.white('==============================')
  const result = `${title}\n${epochStr}\n${slotStr}\n${endLine}`
  console.log(result)
  return result
}
