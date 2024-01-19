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

  // Collecting all disk names to identify which ones have partitions
  const allDiskNames = lines.map((line) => line.trim().split(/\s+/)[0])

  // Initialize the boolean flags
  let has850GB = false
  let has400GB = false
  let hasUsed1250GB = false

  for (const line of lines) {
    const [name, sizeStr, mountpoint] = line.trim().split(/\s+/)
    if (!name || !sizeStr) continue // Skip empty lines or lines without required data

    const size = parseInt(sizeStr, 10)
    if (isNaN(size)) continue // Skip lines where size is not a number
    const isMounted = mountpoint !== ''
    console.log({ isMounted, name, size, mountpoint })
    if (size >= 400 * 1024 * 1024 * 1024) {
      const diskInfo: DiskInfo = { name, size, mountpoint: mountpoint || '' }
      disks.push(diskInfo)

      // Check conditions
      const hasPartition = allDiskNames.some(
        (diskName) => diskName !== name && diskName.startsWith(name),
      )
      if (size >= 850 * 1024 * 1024 * 1024 && !hasPartition && !isMounted)
        has850GB = true
      if (size >= 400 * 1024 * 1024 * 1024 && !hasPartition && !isMounted)
        has400GB = true
      if (size >= 1250 * 1024 * 1024 * 1024 && mountpoint) hasUsed1250GB = true
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

  return { disks: sortedDisks, has850GB, has400GB, hasUsed1250GB }
}

export default getPreferredDisks
