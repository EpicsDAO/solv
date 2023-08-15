import { spawnSync } from 'child_process'
import { existsSync, mkdirSync } from 'fs'

export const ensureMountAndFiles = () => {
  const output = spawnSync(`cat /etc/fstab | grep /mt`, {
    shell: true,
    encoding: 'utf8',
  })

  if (!output.stdout) {
    // マウントするコマンドをここに追加
  }

  const checkOrCreate = (path: string) => {
    if (!existsSync(path)) {
      mkdirSync(path, { recursive: true })
    }
  }

  checkOrCreate('/mt/swapfile')
  checkOrCreate('/mnt/ramdrive')
}
