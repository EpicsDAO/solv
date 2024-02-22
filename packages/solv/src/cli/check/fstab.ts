import { readFileSync } from 'fs'

export const checkFstab = () => {
  const fstab = readFileSync('/etc/fstab', 'utf-8')
  const lines = fstab.split('\n')
  const filtered = lines.filter((line) => line[0] !== '#')
  const parsed = filtered.map((line) => {
    const segments = line.split(/\s+/)
    return {
      FileSystem: segments[0],
      MountPoint: segments[1],
      Type: segments[2],
      Options: segments[3],
      Dump: segments[4],
      Pass: segments[5],
    }
  })
  return parsed
}
