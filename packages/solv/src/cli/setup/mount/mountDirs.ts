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
  // Detect if DISK_TYPE is TRIPLE, DOUBLE or SINGLE
  if (disks.has850GB && disks.has400GB && disks.disks.length >= 3) {
    // TRIPLE
    console.log('Setting up TRIPLE DISK...')

    await updateDefaultConfig({
      MNT_DISK_TYPE: MNT_DISK_TYPE.TRIPLE,
    })
    const fileSystemName1 = '/dev/' + disks.disks[0].name
    const fileSystemName2 = '/dev/' + disks.disks[1].name
    const fileSystemName3 = '/dev/' + disks.disks[2].name
    const isDisk1Formatted = formatDisk(fileSystemName1)
    const isDisk2Formatted = formatDisk(fileSystemName2)
    const isDisk3Formatted = formatDisk(fileSystemName3)

    let fileSystem1 = isDisk1Formatted ? fileSystemName1 : ''
    let fileSystem2 = isDisk2Formatted ? fileSystemName2 : ''
    let fileSystem3 = isDisk3Formatted ? fileSystemName3 : ''

    ensureFstabEntries(
      isDisk1Formatted ? fileSystem1 : '',
      isDisk2Formatted ? fileSystem2 : '',
      isDisk3Formatted ? fileSystem3 : '',
      false, // isDouble
      true // isTriple
    )
  } else if (disks.has850GB && disks.has400GB) {
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

    ensureFstabEntries(
      isDisk1Formatted ? fileSystem1 : '',
      isDisk2Formatted ? fileSystem2 : '',
      '', // No third disk
      true // isDouble
    )
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
