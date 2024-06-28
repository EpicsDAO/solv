import { program } from '@/index'
import { df } from './df'
import { displayTable } from '@/lib/logger/table'
import { logDiskUsage } from './du'

export const dfCommands = async () => {
  program
    .command('df')
    .description('Disk Free Command')
    .action(() => {
      const dirs = df()
      displayTable(dirs)
    })

  program
    .command('du')
    .description('Disk Usage Command')
    .action(() => {
      logDiskUsage()
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
