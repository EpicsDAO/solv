import { execSync } from 'child_process'

type DiskInfo = {
  name: string
  size: number
  mountpoint: string
}

function getPreferredDisks(): DiskInfo[] {
  const commandOutput = execSync('lsblk -l -b -o NAME,SIZE,MOUNTPOINT', {
    encoding: 'utf8',
  })
  const lines = commandOutput.split('\n').slice(1) // skip the header line

  const disks: DiskInfo[] = []

  // Collecting all disk names to identify which ones have partitions
  const allDiskNames = lines.map(line => line.trim().split(/\s+/)[0]);

  for (const line of lines) {
    const [name, sizeStr, mountpoint] = line.trim().split(/\s+/)
    if (!name || !sizeStr) continue; // Skip empty lines or lines without required data

    const size = parseInt(sizeStr, 10)
    if (isNaN(size)) continue; // Skip lines where size is not a number

    if (size >= 490 * 1024 * 1024 * 1024) {
      const diskInfo: DiskInfo = { name, size, mountpoint: mountpoint || '' }
      disks.push(diskInfo)
    }
  }

  // Custom sort function
  const sortDisks = (a: DiskInfo, b: DiskInfo) => {
    // Check if disk is a partition or has partitions
    const isPartitionOrHasPartitionA = allDiskNames.some(diskName => diskName === a.name || diskName.startsWith(a.name + "1"));
    const isPartitionOrHasPartitionB = allDiskNames.some(diskName => diskName === b.name || diskName.startsWith(b.name + "1"));

    // Check for mountpoint
    if (a.mountpoint === '' && b.mountpoint !== '') return -1;
    if (a.mountpoint !== '' && b.mountpoint === '') return 1;

    // Sort by whether the disk is a partition or has partitions
    if (isPartitionOrHasPartitionA && !isPartitionOrHasPartitionB) return 1;
    if (!isPartitionOrHasPartitionA && isPartitionOrHasPartitionB) return -1;

    // Finally, sort by size
    return b.size - a.size;
  };

  // Sort disks
  return disks.sort(sortDisks);
}


export default getPreferredDisks