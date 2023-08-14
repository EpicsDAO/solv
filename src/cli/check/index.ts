import { program } from '@/index'
import { df } from '../df/df'
import chalk from 'chalk'
import { UbuntuDhParams } from '@/types/solvTypes'
import { displayTable } from '@/lib/logger/table'

export const checkCommpands = () => {
  program
    .command('check')
    .description('Solana Check Command')
    .action(() => {
      console.log(`checking ...`)
      const dirs = df()
      displayTable(dirs)
    })
}
