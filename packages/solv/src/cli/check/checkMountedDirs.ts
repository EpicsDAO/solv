import { spawnSync } from 'child_process'

export const checkMountedDirs = (dir: string = '/mt'): boolean => {
  const output = spawnSync(`df -h ${dir}`, { shell: true, encoding: 'utf8' })
  const lines = output.stdout.split('\n')

  if (lines.length < 2) return false

  const details = lines[1].split(/\s+/)
  const size = details[1]

  return convertToBytes(size) >= 900e9 // 900e9 is 900G in bytes
}

const convertToBytes = (size: string): number => {
  const units: { [key: string]: number } = {
    K: 1e3,
    M: 1e6,
    G: 1e9,
    T: 1e12,
  }
  const unit = size.slice(-1)
  const number = parseFloat(size.slice(0, -1))

  return units[unit] ? number * units[unit] : number
}
