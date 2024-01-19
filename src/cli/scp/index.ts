import { program } from '@/index'
import { download } from './download'
import { upload } from './upload'
import { scpCreate } from './create'
import { cat } from './cat'
import { init } from './init'
import { processPaths, search } from './search'
import chalk from 'chalk'
import { Presets, SingleBar } from 'cli-progress'
import { ConfigParams } from '@/lib/createDefaultConfig'

export const scpCommands = (solvConfig: ConfigParams) => {
  const { cmds } = solvConfig.locale
  const scp = program.command('scp').description(cmds.scp).argument('<cmd>')

  scp
    .command('download')
    .alias('dl')
    .description('Export Solana Validator Keypair')
    .action(async () => {
      await download()
    })

  scp
    .command('upload')
    .alias('up')
    .description('Upload Solana Validator Keypair')
    .action(async () => {
      await upload()
    })

  scp
    .command('create')
    .alias('c')
    .description('Create SSH Login Setting')
    .action(async () => {
      await scpCreate()
    })

  scp
    .command('cat')
    .description('Show SSH Public Key')
    .action(() => {
      cat()
    })

  scp
    .command('init')
    .description('Init SSH Key Pair')
    .action(() => {
      init()
    })

  scp
    .command('search')
    .alias('sc')
    .description('Search Solana Validator Key Pair')
    .action(async () => {
      console.log(`start searching...`)
      const progressBar = new SingleBar({}, Presets.shades_classic)
      progressBar.start(10000, 0)
      const solanaKeyPaths = await search(progressBar)
      let result = await processPaths(solanaKeyPaths, progressBar)
      progressBar.stop()
      console.log(
        chalk.white(`🔍 Found ${result.length} Potential Solana Key Pairs 🎉`),
      )
      result = result.slice(0, 10)
      console.log(chalk.green(`\n${result.join('\n')}`))
      console.log(chalk.white('\nOnly showing the first 10 results\n\n'))
      console.log(chalk.white(`$ mv <your-key> /mt/solana/<solvKeyName>.json`))
    })
}
