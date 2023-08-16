import { program } from '@/index'
import { checkMemoryAndSwap } from './checkMemoryAndSwap'
import { checkMountedDirs } from './checkMountedDirs'
import { ensureSolvOwnership } from './ensureSolvOwnerShip'
import { Logger } from '@/lib/logger'

export const checkCommpands = () => {
  program
    .command('check')
    .description('Check Solana Validator Environment')
    .action(() => {
      const mountedDirs = checkMountedDirs()
      console.log({ mountedDirs })
      if (!mountedDirs) {
        Logger.normal(
          `❌ /mt dir is not enough volumes\nCheck your mount point with ${Logger.successHex(
            `\$ solv df\n\$ solv ls`
          )}`
        )
        return
      }
      const memorySwap = checkMemoryAndSwap()
      if (!memorySwap) {
        Logger.normal(
          `❌ Memory and Swap not enough\nRun ${Logger.successHex(
            `$ solv setup --swap --path <yourFileSystemPath>`
          )}`
        )
        return
      }

      ensureSolvOwnership()
      Logger.normal(
        `You are all set 🎉\nRun ${Logger.successHex(
          `$ solv start\n and check your log\n$ solv log tail`
        )}`
      )
    })
}
