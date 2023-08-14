import { program } from '@/index'
import { execSync } from 'child_process'
import chalk from 'chalk'

export const dfCommands = async () => {
  program
    .command('df')
    .description('Solana Disk Free Command')
    .action(async () => {
      const output = execSync('df -h').toString()
      const lines = output.split('\n').slice(1) // 最初の行 (ヘッダー) を除外

      const parsedData = lines.map((line) => {
        const segments = line.split(/\s+/)
        return {
          Filesystem: segments[0],
          Size: segments[1],
          Used: segments[2],
          Avail: segments[3],
          Use: segments[4],
          MountedOn: segments[5],
        }
      })

      console.log(parsedData)
    })
}
