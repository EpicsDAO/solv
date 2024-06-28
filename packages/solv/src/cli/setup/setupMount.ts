import { updateSolvConfig } from '@/lib/updateSolvConfig'
import { ensureFstabEntries } from '../check/ensureMountAndFiles'
import { DISK_TYPES, NETWORK_TYPES, SOLV_TYPES } from '@/config/config'
import { formatDisk } from './formatDisk'
import { umount } from '../check/mt/umount'
import { setupSwap } from './setupSwap'
import { GetPreferredDisksResult } from '../check/mt/getLargestDisk'
import { setupDirs } from './mkdirs'

const setupMount = async (
  swapsize: number,
  disks: GetPreferredDisksResult,
  solvType: SOLV_TYPES,
  commission: number,
  isTest: boolean,
) => {
  const mountPoint = disks.disks[0].mountpoint
  setupDirs()
  // Detect if DISK_TYPE is DOUBLE or SINGLE
  if (disks.has850GB && disks.has400GB) {
    // DOUBLE
    console.log('Setting up DOUBLE DISK...')

    updateSolvConfig({
      DISK_TYPES: DISK_TYPES.DOUBLE,
      SOLV_TYPE: solvType,
      COMMISSION: commission,
      SOLANA_NETWORK: isTest ? NETWORK_TYPES.TESTNET : NETWORK_TYPES.MAINNET,
    })

    const fileSystemName1 = '/dev/' + disks.disks[0].name
    const fileSystemName2 = '/dev/' + disks.disks[1].name
    const isDisk1Formatted = formatDisk(fileSystemName1)
    const isDisk2Formatted = formatDisk(fileSystemName2)

    // Swap setup
    await setupSwap(swapsize)

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
    updateSolvConfig({
      DISK_TYPES: DISK_TYPES.SINGLE,
      SOLV_TYPE: solvType,
      COMMISSION: commission,
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

export default setupMount
