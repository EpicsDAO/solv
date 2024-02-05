import { spawnSync } from 'child_process'

export const deleteSnapshot = () => {
  try {
    const accountPath = `/mnt/accounts/*`
    const ledgerPath = `/mnt/ledger/*`
    const cmd = `sudo rm -rf ${accountPath} ${ledgerPath}`
    spawnSync(cmd, { shell: true, stdio: 'inherit' })
    return true
  } catch (error) {
    throw new Error(`deleteSnapshot: ${error}`)
  }
}
