import { spawnSync } from 'child_process'

export const umount = (mountPath: string) => {
  try {
    const cmd = `sudo umount ${mountPath}`
    const { stderr } = spawnSync(cmd, { shell: true, stdio: 'inherit' })
    if (stderr.includes('busy')) {
      return false
    }
    return true
  } catch (error) {
    console.log(`umount: ${error}`)
    return false
  }
}
