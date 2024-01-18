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

  const disks = []

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
    // Check for mountpoint
    if (a.mountpoint === '' && b.mountpoint !== '') return -1;
    if (a.mountpoint !== '' && b.mountpoint === '') return 1;

    // Check if one is a prefix of the other
    if (a.name.startsWith(b.name)) return 1;
    if (b.name.startsWith(a.name)) return -1;

    // Check if name ends with a number
    const aEndsWithNumber = /\d$/.test(a.name);
    const bEndsWithNumber = /\d$/.test(b.name);
    if (aEndsWithNumber && !bEndsWithNumber) return 1;
    if (!aEndsWithNumber && bEndsWithNumber) return -1;

    // Finally, sort by size
    return b.size - a.size;
  };

  // Sort disks
  return disks.sort(sortDisks);
}


export default getPreferredDisks