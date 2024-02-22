import { spawnSync } from 'child_process'

export const deleteSnapshot = () => {
  try {
    const ledgerPath = `/mnt/ledger/*snapshot*`
    const cmd = `sudo rm -rf ${ledgerPath}`
    spawnSync(cmd, { shell: true, stdio: 'inherit' })
    return true
  } catch (error) {
    throw new Error(`deleteSnapshot: ${error}`)
  }
}
