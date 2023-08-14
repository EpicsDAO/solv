import { UbuntuDhParams } from '@/types/solvTypes'
import { execSync } from 'child_process'

export const df = () => {
  const output = execSync('df -h').toString()
  const lines = output.split('\n').slice(1) // 最初の行 (ヘッダー) を除外

  const parsedData = lines.map((line) => {
    const segments = line.split(/\s+/)
    return {
      Filesystem: segments[0],
      Size: segments[1],
      Used: segments[2],
      Avail: segments[3],
      Use: segments[4],
      MountedOn: segments[5],
    } as UbuntuDhParams
  })
  return parsedData.sort(
    (a, b) => convertToBytes(b.Avail) - convertToBytes(a.Avail)
  )
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
