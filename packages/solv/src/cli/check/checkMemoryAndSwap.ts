import { spawnSync } from 'child_process'

export const checkMemory = (): boolean => {
  const output = spawnSync(`free -g`, { shell: true, encoding: 'utf8' })
  const lines = output.stdout.split('\n')

  if (lines.length < 3) return false

  const memDetails = lines[1].split(/\s+/)

  const memTotal = parseInt(memDetails[1], 10)

  return memTotal >= 200
}
