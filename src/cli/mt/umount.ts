import { spawnSync } from 'child_process'

export const umount = (mountPath: string) => {
  try {
    const cmd = `sudo umount ${mountPath}`
    spawnSync(cmd, { shell: true, stdio: 'inherit' })
  } catch (error) {
    throw new Error(`umount Error: ${error}`)
  }
}
