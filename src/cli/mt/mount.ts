import { spawnSync } from 'child_process'

export const mount = (fileSystem: string, mountPath = '/mt') => {
  try {
    const cmd = `sudo mount ${fileSystem} ${mountPath}`
    spawnSync(cmd, { shell: true, stdio: 'inherit' })
  } catch (error) {
    throw new Error(`mount Error: ${error}`)
  }
}
