import { execSync } from 'child_process'

export type DiskInfo = {
  name: string
  size: number
  mountpoint: string
  isMounted: boolean
  hasPartition: boolean
  type: 'NVMe' | 'SATA'
}

export type GetPreferredDisksResult = {
  disks: DiskInfo[]
  has850GB: boolean
  has400GB: boolean
  hasUsed1250GB: boolean
  hasThirdDisk400GB: boolean
}

// This method can be improved later - Prioritize the NVMe disks over SATA disks
// Currently, it is just selecting the first disk
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
  let hasThirdDisk400GB = false
  let rootDiskName = ''

  for (const line of lines) {
    const [name, sizeStr, mountpoint] = line.trim().split(/\s+/)
    if (!name || !sizeStr) continue // Skip empty lines or lines without required data

    const size = parseInt(sizeStr, 10)
    if (isNaN(size)) continue // Skip lines where size is not a number
    const isMounted = mountpoint !== undefined && mountpoint !== ''
    if (mountpoint === '/') rootDiskName = name.replace(/[0-9]*$/, '') // Remove any trailing digits
    const hasPartition = allDiskNames.some(
      (diskName) => diskName !== name && diskName.startsWith(name),
    )

    // Soft check if a drive is an NVMe based on its name
    const isNVMe = name.startsWith('nvme')
    const diskType = isNVMe ? 'NVMe' : 'SATA'
    if (size >= 400 * 1024 * 1024 * 1024) {
      disks.push({
        name,
        size,
        mountpoint: mountpoint || '',
        isMounted,
        hasPartition,
        type: diskType
      })
    }
  }

  // Collect partitions of the root disk
  const rootDiskPartitions = allDiskNames.filter((diskName) =>
    diskName.startsWith(rootDiskName),
  )

  // Remove root disk and its partitions from the list of disks
  const checkedDisks = disks.filter(
    (disk) => !rootDiskPartitions.includes(disk.name),
  )

  // Sort disks by size
  const sortedDisks = checkedDisks.sort((a, b) => b.size - a.size)

  // Separate NVMe and SATA disks, and sort by size (largest first)
  const nvmeDisks = sortedDisks
    .filter((disk) => disk.type === 'NVMe')
    .sort((a, b) => b.size - a.size);
  const sataDisks = sortedDisks
    .filter((disk) => disk.type === 'SATA')
    .sort((a, b) => b.size - a.size);

  // Combine NVMe and SATA disks, prioritizing NVMe first
  const prioritizedDisks = [...nvmeDisks, ...sataDisks];

  // Check conditions based on sorted disks
  if (prioritizedDisks.length > 0) {
    const largestDisk = prioritizedDisks[0]
    if (largestDisk.size >= 850 * 1024 * 1024 * 1024 && !largestDisk.isMounted)
      has850GB = true
    if (largestDisk.size >= 1250 * 1024 * 1024 * 1024 && largestDisk.isMounted)
      hasUsed1250GB = true

    // Check second largest disk for has400GB
    if (prioritizedDisks.length > 1) {
      const secondLargestDisk = prioritizedDisks[1]
      if (
        secondLargestDisk.size >= 400 * 1024 * 1024 * 1024 &&
        !secondLargestDisk.isMounted
      )
        has400GB = true
    }

    // Check if a third disk is present
    if (prioritizedDisks.length > 2) {
      const thirdDisk = prioritizedDisks[2]
      if (
        thirdDisk.size >= 400 * 1024 * 1024 * 1024 &&
        !thirdDisk.isMounted
      ) {
        hasThirdDisk400GB = true
      }
    }
  }

  return { disks: prioritizedDisks, has850GB, has400GB, hasUsed1250GB, hasThirdDisk400GB }
}

export default getPreferredDisks
