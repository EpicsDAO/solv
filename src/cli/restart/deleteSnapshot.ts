import { startupScriptPaths } from '@/config/config'
import { spawnSync } from 'child_process'

export const deleteSnapshot = () => {
  try {
    const { ledger } = startupScriptPaths()
    const snapshotsPath = `${ledger}/snapshots*`
    const ledgerPath = `${ledger}/ledger`
    const cmd = `sudo rm -rf ${snapshotsPath} ${ledgerPath}`
    spawnSync(cmd, { shell: true, stdio: 'inherit' })
    return true
  } catch (error) {
    throw new Error(`deleteSnapshot: ${error}`)
  }
}
