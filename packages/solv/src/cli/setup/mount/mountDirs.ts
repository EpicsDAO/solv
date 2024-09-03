import getPreferredDisks, {
  GetPreferredDisksResult,
} from '@/cli/check/mt/getLargestDisk'
import { MNT_DISK_TYPE } from '@/config/enums'
import { updateDefaultConfig } from '@/config/updateDefaultConfig'
import { formatDisk } from '../formatDisk'
import { ensureFstabEntries } from '@/cli/check/ensureMountAndFiles'
import { umount } from '@/cli/check/mt/umount'

const mountDirs = async () => {
  // This method can be improved later - Prioritize the NVMe disks over SATA disks
  // Currently, it is just selecting the first disk
  const disks: GetPreferredDisksResult = getPreferredDisks()

  const mountPoint = disks.disks[0].mountpoint
  // Detect if DISK_TYPE is DOUBLE or SINGLE
  if (disks.has850GB && disks.has400GB) {
    // DOUBLE
    console.log('Setting up DOUBLE DISK...')

    await updateDefaultConfig({
      MNT_DISK_TYPE: MNT_DISK_TYPE.DOUBLE,
    })
    const fileSystemName1 = '/dev/' + disks.disks[0].name
    const fileSystemName2 = '/dev/' + disks.disks[1].name
    const isDisk1Formatted = formatDisk(fileSystemName1)
    const isDisk2Formatted = formatDisk(fileSystemName2)

    let fileSystem1 = isDisk1Formatted ? fileSystemName1 : ''
    let fileSystem2 = isDisk2Formatted ? fileSystemName2 : ''
    let isLatitude = false
    if (fileSystem1 === '' && fileSystem2) {
      fileSystem1 = fileSystem2
      fileSystem2 = ''
      isLatitude = true
    }
    ensureFstabEntries(fileSystem1, fileSystem2, isLatitude)
  } else {
    // SINGLE
    console.log('Setting up SINGLE DISK...')
    await updateDefaultConfig({
      MNT_DISK_TYPE: MNT_DISK_TYPE.SINGLE,
    })

    if (!mountPoint.includes('/mnt')) {
      const fileSystem = '/dev/' + disks.disks[0].name
      formatDisk(fileSystem)
      ensureFstabEntries(fileSystem)
    } else {
      umount(mountPoint)
      const fileSystem = '/dev/' + disks.disks[0].name
      formatDisk(fileSystem)
      ensureFstabEntries(fileSystem)
    }
  }
}

export default mountDirs
