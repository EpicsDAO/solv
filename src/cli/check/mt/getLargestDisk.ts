import { execSync } from 'child_process'

type DiskInfo = {
  name: string
  size: number
  mountpoint: string
}

type GetPreferredDisksResult = {
  disks: DiskInfo[]
  has980GB: boolean
  has480GB: boolean
  hasUsed1480GB: boolean
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
  let has980GB = false
  let has480GB = false
  let hasUsed1480GB = false

  for (const line of lines) {
    const [name, sizeStr, mountpoint] = line.trim().split(/\s+/)
    if (!name || !sizeStr) continue // Skip empty lines or lines without required data

    const size = parseInt(sizeStr, 10)
    if (isNaN(size)) continue // Skip lines where size is not a number

    if (size >= 490 * 1024 * 1024 * 1024) {
      const diskInfo: DiskInfo = { name, size, mountpoint: mountpoint || '' }
      disks.push(diskInfo)

      // Check conditions
      const hasPartition = allDiskNames.some(
        (diskName) => diskName !== name && diskName.startsWith(name),
      )
      if (size >= 980 * 1024 * 1024 * 1024 && !hasPartition) has980GB = true
      if (size >= 480 * 1024 * 1024 * 1024 && !hasPartition) has480GB = true
      if (size >= 1480 * 1024 * 1024 * 1024 && mountpoint) hasUsed1480GB = true
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

  return { disks: sortedDisks, has980GB, has480GB, hasUsed1480GB }
}

export default getPreferredDisks
