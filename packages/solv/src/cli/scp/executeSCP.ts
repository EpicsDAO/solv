import { spawnSync } from 'node:child_process'

export function executeSCP(
  ip: string,
  key: string,
  filePath: string,
  isDownload: boolean,
) {
  const cmd = isDownload
    ? `scp solv@${ip}:${key} ${filePath}`
    : `scp ${key} solv@${ip}:${filePath}`
  const result = spawnSync(cmd, { shell: true, stdio: 'inherit' })

  return result.status === 0
}
