import { program } from '@/index'
import { checkFstab } from './fstab'
import { checkMemoryAndSwap } from './checkMemoryAndSwap'
import { checkMountedDirs } from './checkMountedDirs'
import { ensureSolvOwnership } from './ensureSolvOwnerShip'

export const checkCommpands = () => {
  program
    .command('check')
    .description('Solana Check Command')
    .action(() => {
      const memorySwap = checkMemoryAndSwap()
      console.log({ memorySwap })
      const mountedDirs = checkMountedDirs()
      console.log({ mountedDirs })
      const solvPermission = ensureSolvOwnership()
    })
}
