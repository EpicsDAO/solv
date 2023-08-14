import { program } from '@/index'
import { df } from '../df/df'
import chalk from 'chalk'

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
            .map((dir: Record<string, string>) => {
              return `${dir.mount} ${dir.used} ${dir.available} ${dir.use}%`
            })
            .join('\n')}`
        )
      )
    })
}
