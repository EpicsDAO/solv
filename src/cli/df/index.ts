import { program } from '@/index'
import { df } from './df'
import { logDiskUsage } from './du'
import { displayTable } from '@/lib/logger/table'
import { lsblk } from './lsblk'
import { Logger } from '@/lib/logger'

export const dfCommands = async () => {
  program
    .command('df')
    .description('Solana Disk Free Command')
    .action(async () => {
      const dirs = df()
      displayTable(dirs)
      Logger.mtCommandsLog()
    })

  program
    .command('lsblk')
    .description('Solana Disk Usage Command')
    .action(async () => {
      lsblk()
      Logger.mtCommandsLog()
    })
}

export const convertToBytes = (size: string): number => {
  const units: { [key: string]: number } = {
    K: 1e3,
    KB: 1e3,
    M: 1e6,
    MB: 1e6,
    G: 1e9,
    GB: 1e9,
    T: 1e12,
    TB: 1e12,
  }
  const unit = size.match(/[A-Za-z]+/)?.[0] || ''
  const number = parseFloat(size)

  return units[unit] ? number * units[unit] : number
}
