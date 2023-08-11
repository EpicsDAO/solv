import { program } from '@/index'
import { mvDeb } from './mvDeb'
import { releaseDebian } from './releaseDebian'

export const releaseCommands = async () => {
  program
    .command('release')
    .description('release commands')
    .alias('r')
    .description('publish release')
    .argument('<version>', 'Solana Version e.g. 1.16.7')
    .action(async (version: string) => {
      await releaseDebian(version)
    })
}
