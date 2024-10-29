import { Command } from '@cliffy'
import denoJson from '/deno.json' with { type: 'json' }

const program = await new Command()
  .name('solv')
  .version(denoJson.version)
  .description('🪄  solv - Solana Validator Tool ✨')
  .globalOption('-d, --debug', 'Enable debug output.')
  .action((options, ...args) => console.log('Main command called.'))
// Child command 1.
program
  .command('foo', 'Foo sub-command.')
  .option('-f, --foo', 'Foo option.')
  .arguments('<value:string>')
  .action((options, ...args) => console.log('Foo command called.'))
// Child command 2.
program
  .command('bar', 'Bar sub-command.')
  .option('-b, --bar', 'Bar option.')
  .arguments('<input:string> [output:string]')
  .action((options, ...args) => console.log('Bar command called.'))
  .parse(Deno.args)
