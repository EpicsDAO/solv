import { spawnSync } from 'child_process'

export const rmMtDir = () => {
  try {
    const cmd = `sudo rm -rf /mt`
    spawnSync(cmd, { shell: true, stdio: 'inherit' })
    const cmd2 = `sudo umount /mt`
    spawnSync(cmd2, { shell: true, stdio: 'inherit' })
    const cmd3 = `sudo rm -rf /mnt/ramdrive`
    spawnSync(cmd3, { shell: true, stdio: 'inherit' })
    const cmd4 = `sudo umount /mnt/ramdrive`
    spawnSync(cmd4, { shell: true, stdio: 'inherit' })
  } catch (error) {
    console.log(`rmMtDir: ${error}`)
  }
}
