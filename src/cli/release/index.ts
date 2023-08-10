import { program } from '@/index'
import { mvDeb } from './mvDeb'

export const releaseCommands = async () => {
  const release = program.command('release').description('release commands')

  release
    .command('mvDeb')
    .alias('m')
    .description('move deb files to release folder')
    .argument('<version>', 'Solana Version e.g. 1.16.7')
    .action((version: string) => {
      mvDeb(version)
    })
}
