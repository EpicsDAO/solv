import { execSync } from 'child_process'
import chalk from 'chalk'
import { Logger } from '@/lib/logger'
import { convertToBytes } from '.'

type BlockDeviceInfo = {
  Name: string
  Size: string
  Type: string
  Mountpoint: string | null
}

export const lsblk = () => {
  const output = execSync('lsblk -l').toString()
  const lines = output.split('\n').slice(1)

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
    .sort((a, b) => convertToBytes(b.Size) - convertToBytes(a.Size))
    .slice(0, 10)

  const redDevices: string[] = []
  let isMountPointCorrect = false

  console.log(chalk.bold('Name\tSize\tType\tMountpoint'))
  parsedData.forEach((data) => {
    const isSizeLarge = convertToBytes(data.Size) >= 900e9
    const color =
      data.Mountpoint === '/mt'
        ? chalk.green
        : isSizeLarge
        ? chalk.red
        : chalk.white
    console.log(
      color(
        `${data.Name}\t${data.Size}\t${data.Type}\t${data.Mountpoint || ''}`
      )
    )
    if (isSizeLarge && data.Name !== '/dev/')
      redDevices.push(`/dev/${data.Name}`)
    if (data.Mountpoint === '/mt' && isSizeLarge) isMountPointCorrect = true
  })

  if (isMountPointCorrect) {
    Logger.normal('Your mount point looks correct 🎉')
  } else if (redDevices.length) {
    console.log(
      Logger.warningHex(
        `\nfileSystem might be one of ${redDevices.join(', ')} ...?`
      )
    )
  }
}
