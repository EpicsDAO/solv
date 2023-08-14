import { program } from '@/index'
import { df } from '../df/df'
import chalk from 'chalk'
import { UbuntuDhParams } from '@/types/solvTypes'

export const checkCommpands = () => {
  program
    .command('check')
    .description('Solana Check Command')
    .action(() => {
      console.log(`checking ...`)
      const dirs = df()
      console.log(
        chalk.white(
          `${dirs
            .map((dir: UbuntuDhParams) => {
              return `${dir.Filesystem} ${dir.Avail} ${dir.Use}% ${dir.MountedOn}`
            })
            .join('\n')}`
        )
      )
    })
}
