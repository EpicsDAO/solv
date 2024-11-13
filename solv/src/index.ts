import { Command } from '@cliffy'
import denoJson from '../deno.json' with { type: 'json' }
import loadConfig from '@/config/loadConfig.ts'
import { systemctlCommand } from '@/cli/systemctl/index.ts'

const main = async () => {
  const config = await loadConfig()
  const program = new Command()
    .name('solv')
    .version(denoJson.version)
    .description('🪄  solv - Solana Validator Tool ✨') as unknown as Command

  program
    .command('test')
    .description('Test Command')
    .action(() => {
      console.log('Test Command')
      return
    })

  systemctlCommand(program, config)
  program.parse(Deno.args)
  return
}

await main()
