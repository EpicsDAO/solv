import { execSync } from 'child_process'

export type DiskInfo = {
  name: string
  size: number
  mountpoint: string
}

export type GetPreferredDisksResult = {
  disks: DiskInfo[]
  has850GB: boolean
  has400GB: boolean
  hasUsed1250GB: boolean
}

function getPreferredDisks(): GetPreferredDisksResult {
  const commandOutput = execSync('lsblk -l -b -o NAME,SIZE,MOUNTPOINT', {
    encoding: 'utf8',
  })
  const lines = commandOutput.split('\n').slice(1) // skip the header line

  const disks: DiskInfo[] = []
  let has850GB = false
  let has400GB = false
  let hasUsed1250GB = false

  for (const line of lines) {
    const [name, sizeStr, mountpoint] = line.trim().split(/\s+/)
    if (!name || !sizeStr) continue // Skip empty lines or lines without required data

    const size = parseInt(sizeStr, 10)
    if (isNaN(size)) continue // Skip lines where size is not a number

    if (size >= 400 * 1024 * 1024 * 1024) {
      const diskInfo: DiskInfo = { name, size, mountpoint: mountpoint || '' }
      disks.push(diskInfo)

      // Check conditions
      if (size >= 850 * 1024 * 1024 * 1024 && mountpoint) has850GB = true
      if (size >= 400 * 1024 * 1024 * 1024 && mountpoint) has400GB = true
      if (size >= 1250 * 1024 * 1024 * 1024 && mountpoint) hasUsed1250GB = true
    }
  }

  // Sort disks by size
  const sortedDisks = disks.sort((a, b) => b.size - a.size)

  return { disks: sortedDisks, has850GB, has400GB, hasUsed1250GB }
}

export default getPreferredDisks
