import { program } from '@/index'
import { checkMemoryAndSwap } from './checkMemoryAndSwap'
import { checkMountedDirs } from './checkMountedDirs'
import { ensureSolvOwnership } from './ensureSolvOwnerShip'
import { Logger } from '@/lib/logger'

export const checkCommpands = () => {
  program
    .command('check')
    .description('Solana Check Command')
    .action(() => {
      const memorySwap = checkMemoryAndSwap()
      if (!memorySwap) {
        Logger.normal(
          `❌ Memory and Swap not enough\nRun ${Logger.successHex(
            `$ solv setup --swap`
          )}`
        )
        return
      }
      const mountedDirs = checkMountedDirs()
      console.log({ mountedDirs })
      const solvPermission = ensureSolvOwnership()
    })
}
