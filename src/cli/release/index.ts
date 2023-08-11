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
    .option('-m, --mv', 'Only Move deb files to release folder', false)
    .action(async (version: string, options) => {
      if (options.mv) {
        mvDeb(version)
      } else {
        await releaseDebian(version)
      }
    })
}
