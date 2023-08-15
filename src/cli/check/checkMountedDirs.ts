import { spawnSync } from 'child_process'

export const checkMountedDirs = (dir: string = '/mt'): boolean => {
  const output = spawnSync(`df -h ${dir}`, { shell: true, encoding: 'utf8' })
  const lines = output.stdout.split('\n')

  if (lines.length < 2) return false

  const details = lines[1].split(/\s+/)
  const size = details[1]
  const capacity = parseFloat(size.replace('T', ''))

  return capacity >= 1
}
