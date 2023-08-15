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
        Name: segments[0] || '',
        Size: segments[3] || '',
        Type: segments[5] || '',
        Mountpoint: segments[6] || null,
      }
    })
    .sort((a, b) => {
      if (a.Mountpoint && b.Mountpoint) {
        return convertToBytes(b.Size) - convertToBytes(a.Size)
      }
      if (a.Mountpoint) return 1
      if (b.Mountpoint) return -1
      return convertToBytes(b.Size) - convertToBytes(a.Size)
    })

  console.log(chalk.bold('Name\tSize\tType\tMountpoint'))
  parsedData.forEach((data) => {
    const color =
      data.Mountpoint === '/mt'
        ? chalk.green
        : data.Mountpoint
        ? chalk.white
        : chalk.red
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
