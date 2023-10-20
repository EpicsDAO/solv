import { execSync } from 'child_process'

type DiskInfo = {
  name: string
  size: number
  mountpoint: string
}

export function getPreferredDisk(): DiskInfo | null {
  const commandOutput = execSync('lsblk -l -b -o NAME,SIZE,MOUNTPOINT', {
    encoding: 'utf8',
  })
  const lines = commandOutput.split('\n').slice(1) // skip the header line

  let unmountedDisk: DiskInfo | null = null
  let mountedDisk: DiskInfo | null = null

  for (const line of lines) {
    const [name, sizeStr, mountpoint] = line.trim().split(/\s+/)
    const size = parseInt(sizeStr, 10)

    if (size >= 1e12) {
      // check if disk size is 1TB or more
      const diskInfo: DiskInfo = { name, size, mountpoint: mountpoint || '' }

      if (!mountpoint && !unmountedDisk) {
        unmountedDisk = diskInfo // prefer unmounted disk first
      } else if (mountpoint && !mountedDisk) {
        mountedDisk = diskInfo // fallback to mounted disk if no unmounted disk found
      }

      if (unmountedDisk) {
        break // exit early if an unmounted disk is found
      }
    }
  }

  return unmountedDisk || mountedDisk // return unmounted disk if found, else return mounted disk
}
