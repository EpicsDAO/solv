import { SOLV_TYPES, startupScriptPaths } from '@/config/config'
import { program } from '@/index'
import { getStartupScript } from '@/template/getStartupScript'
import { spawnSync } from 'child_process'
import { chmodSync, writeFileSync } from 'fs'
import { deleteSnapshot } from './deleteSnapshot'

type RestartOptions = {
  snapshot: boolean
  rpc: boolean
  mainnet: boolean
}

export const restartCommand = () => {
  program
    .command('restart')
    .description('Restart Solana Validator')
    .option('--snapshot', 'Restart Solana Validator with fetch snapshot', false)
    .option('--rpc', 'Restart Solana RPC Node', false)
    .option('--mainnet', 'Restart Solana Mainnet Validator', false)
    .action(async (options: RestartOptions) => {
      let solvTypes = SOLV_TYPES.TESTNET_VALIDATOR
      if (options.rpc) {
        solvTypes = SOLV_TYPES.RPC_NODE
      } else if (options.mainnet) {
        solvTypes = SOLV_TYPES.MAINNET_VALIDATOR
      }
      const { scriptPath } = startupScriptPaths()
      if (options.snapshot) {
        const script = getStartupScript(true, solvTypes)
        deleteSnapshot()
        writeFileSync(scriptPath, script)
        chmodSync(scriptPath, '755')
      } else {
        const script = getStartupScript(false, solvTypes)
        writeFileSync(scriptPath, script)
        chmodSync(scriptPath, '755')
      }
      const cmd = `sudo systemctl restart solv`
      spawnSync(cmd, { shell: true, stdio: 'inherit' })
    })
}
