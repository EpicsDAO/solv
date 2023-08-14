import { program } from '@/index'
import { execSync } from 'child_process'
import chalk from 'chalk'
import { df } from './df'

export const dfCommands = async () => {
  program
    .command('df')
    .description('Solana Disk Free Command')
    .action(async () => {
      const parsedData = df()
      console.log(parsedData)
    })
}
