import { LOG_PATH } from '@/index'
import { spawnSync } from 'child_process'

export type TailOptions = {
  info: boolean
  warning: boolean
  error: boolean
  all: boolean
}

export const tail = async (options: TailOptions) => {
  try {
    let cmd = `tail -f ${LOG_PATH}/solana-validator.log`
    if (options.all) {
      cmd += ` | grep '\(WARN\|ERR\)'`
    } else if (options.info) {
      cmd += ` | grep INFO`
    } else if (options.warning) {
      cmd += ` | grep WARN`
    } else {
      cmd += ` | grep ERR`
    }
    spawnSync(cmd, { shell: true, stdio: 'inherit' })
  } catch (error) {
    throw new Error(`tail Error: ${error}`)
  }
}
