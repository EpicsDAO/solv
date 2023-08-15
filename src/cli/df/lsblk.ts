import { execSync } from 'child_process'
import chalk from 'chalk'

type BlockDeviceInfo = {
  Name: string
  Size: string
  Type: string
  Mountpoint: string | null
}

export const lsblk = () => {
  const output = execSync('lsblk -l').toString()
  const lines = output.split('\n').slice(1) // ヘッダー行を除外

  const parsedData: BlockDeviceInfo[] = lines
    .filter((line) => line.trim() !== '')
    .map((line) => {
      const segments = line.split(/\s+/)
      return {
        Name: segments[0],
        Size: segments[3],
        Type: segments[5],
        Mountpoint: segments[6] || null,
      }
    })
    .sort((a, b) => convertToBytes(b.Size) - convertToBytes(a.Size))

  console.log(chalk.bold('Name\tSize\tType\tMountpoint'))
  parsedData.forEach((data, index) => {
    const color = index === 0 ? chalk.red : chalk.white
    console.log(
      color(
        `${data.Name}\t${data.Size}\t${data.Type}\t${data.Mountpoint || ''}`
      )
    )
  })
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
