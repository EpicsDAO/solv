import { execSync } from 'child_process'

type DiskInfo = {
  name: string
  size: number
  mountpoint: string
}

export function getLargestDisk(): DiskInfo | null {
  const commandOutput = execSync('lsblk -l -b -o NAME,SIZE,MOUNTPOINT', {
    encoding: 'utf8',
  })
  const lines = commandOutput.split('\n').slice(1) // skip the header line

  let largestDisk: DiskInfo | null = null

  for (const line of lines) {
    const [name, sizeStr, mountpoint] = line.trim().split(/\s+/)
    const size = parseInt(sizeStr, 10)

    if (!largestDisk || (size > largestDisk.size && mountpoint)) {
      largestDisk = { name, size, mountpoint }
    }
  }

  return largestDisk
}
