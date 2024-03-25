import { ConfigParams } from '@/lib/readOrCreateDefaultConfig'
import { spawn } from 'child_process'

export const createSnapshot = (solvConfig: ConfigParams, slot: string) => {
  try {
    const ledgerPath = solvConfig.config.LEDGER_PATH
    const cmd = `solana-ledger-tool -l ${ledgerPath} \
    --snapshot-archive-path ${ledgerPath} \
    --incremental-snapshot-archive-path ${ledgerPath} \
    create-snapshot ${slot} ${ledgerPath} \
    --hard-fork ${slot}\
    --deactivate-feature-gate EJJewYSddEEtSZHiqugnvhQHiWyZKjkFDQASd7oKSagn`
    const process = spawn(cmd, { shell: true })

    process.stdout.on('data', (data) => {
      console.log(data.toString())
    })

    process.stderr.on('data', (data) => {
      console.error(data.toString())
    })

    process.on('exit', (code) => {
      if (code === 0) {
        console.log(`Snapshot created for slot: ${slot}`)
      } else {
        throw new Error(`createSnapshot: ${code}`)
      }
    })
  } catch (error) {
    throw new Error(`createSnapshot: ${error}`)
  }
}
