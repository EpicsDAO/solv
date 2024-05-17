import { execSync } from 'child_process'

export type DiskInfo = {
  name: string
  size: number
  mountpoint: string
  isMounted: boolean
  hasPartition: boolean
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
  let rootDiskName = ''

  for (const line of lines) {
    const [name, sizeStr, mountpoint] = line.trim().split(/\s+/)
    if (!name || !sizeStr) continue // Skip empty lines or lines without required data

    const size = parseInt(sizeStr, 10)
    if (isNaN(size)) continue // Skip lines where size is not a number
    const isMounted = mountpoint !== undefined && mountpoint !== ''
    if (mountpoint === '/') rootDiskName = name
    const hasPartition = allDiskNames.some(
      (diskName) => diskName !== name && diskName.startsWith(name),
    )

    if (size >= 400 * 1024 * 1024 * 1024) {
      disks.push({
        name,
        size,
        mountpoint: mountpoint || '',
        isMounted,
        hasPartition,
      })
    }
  }

  const checkedDisks = disks.filter((disk) => !disk.name.includes(rootDiskName))

  // Sort disks by size
  const sortedDisks = checkedDisks.sort((a, b) => b.size - a.size)

  // Check conditions based on sorted disks
  if (sortedDisks.length > 0) {
    const largestDisk = sortedDisks[0]
    if (largestDisk.size >= 850 * 1024 * 1024 * 1024 && !largestDisk.isMounted)
      has850GB = true
    if (largestDisk.size >= 1250 * 1024 * 1024 * 1024 && largestDisk.isMounted)
      hasUsed1250GB = true

    // Check second largest disk for has400GB
    if (sortedDisks.length > 1) {
      const secondLargestDisk = sortedDisks[1]
      if (
        secondLargestDisk.size >= 400 * 1024 * 1024 * 1024 &&
        !secondLargestDisk.isMounted
      )
        has400GB = true
    }
  }

  return { disks: sortedDisks, has850GB, has400GB, hasUsed1250GB }
}

export default getPreferredDisks
