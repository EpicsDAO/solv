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
    const cmd = [`tail -f ${LOG_PATH}/solana-validator.log`]
    if (options.all) {
      cmd.push(`| grep '\(WARN\|ERR\)'`)
    } else if (options.info) {
      cmd.push(`| grep INFO`)
    } else if (options.warning) {
      cmd.push(`| grep WARN`)
    } else {
      cmd.push(`| grep ERR`)
    }
    spawnSync(cmd.join(' && '), { shell: true, stdio: 'inherit' })
  } catch (error) {
    throw new Error(`tail Error: ${error}`)
  }
}
