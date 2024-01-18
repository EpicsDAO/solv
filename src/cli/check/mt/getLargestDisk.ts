import { execSync } from 'child_process'

export type DiskInfo = {
  name: string
  size: number
  mountpoint: string
}

export type GetPreferredDisksResult = {
  disks: DiskInfo[]
  has900GB: boolean
  has400GB: boolean
  hasUsed1400GB: boolean
}

function getPreferredDisks(): GetPreferredDisksResult {
  const commandOutput = execSync('lsblk -l -b -o NAME,SIZE,MOUNTPOINT', {
    encoding: 'utf8',
  })
  const lines = commandOutput.split('\n').slice(1) // skip the header line

  const disks: DiskInfo[] = []

  // Collecting all disk names to identify which ones have partitions
  const allDiskNames = lines.map((line) => line.trim().split(/\s+/)[0])

  // Initialize the boolean flags
  let has900GB = false
  let has400GB = false
  let hasUsed1400GB = false

  for (const line of lines) {
    const [name, sizeStr, mountpoint] = line.trim().split(/\s+/)
    if (!name || !sizeStr) continue // Skip empty lines or lines without required data

    const size = parseInt(sizeStr, 10)
    if (isNaN(size)) continue // Skip lines where size is not a number

    if (size >= 400 * 1024 * 1024 * 1024) {
      const diskInfo: DiskInfo = { name, size, mountpoint: mountpoint || '' }
      disks.push(diskInfo)

      // Check conditions
      const hasPartition = allDiskNames.some(
        (diskName) => diskName !== name && diskName.startsWith(name),
      )
      if (size >= 900 * 1024 * 1024 * 1024 && !hasPartition) has900GB = true
      if (size >= 400 * 1024 * 1024 * 1024 && !hasPartition) has400GB = true
      if (size >= 1400 * 1024 * 1024 * 1024 && mountpoint) hasUsed1400GB = true
    }
  }

  // Custom sort function
  const sortDisks = (a: DiskInfo, b: DiskInfo) => {
    // Check for mountpoint
    if (a.mountpoint === '' && b.mountpoint !== '') return -1
    if (a.mountpoint !== '' && b.mountpoint === '') return 1

    // Check if disk has partitions
    const hasPartitionA = allDiskNames.some(
      (diskName) => diskName !== a.name && diskName.startsWith(a.name),
    )
    const hasPartitionB = allDiskNames.some(
      (diskName) => diskName !== b.name && diskName.startsWith(b.name),
    )

    // Sort by whether the disk has partitions
    if (hasPartitionA && !hasPartitionB) return 1
    if (!hasPartitionA && hasPartitionB) return -1

    // Finally, sort by size
    return b.size - a.size
  }

  // Sort disks
  const sortedDisks = disks.sort(sortDisks)

  return { disks: sortedDisks, has900GB, has400GB, hasUsed1400GB }
}

export default getPreferredDisks
