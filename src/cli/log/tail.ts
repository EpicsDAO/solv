import { SolvConfig } from '@/types/solvTypes'
import { spawn } from 'child_process'

export type TailOptions = {
  info: boolean
  warning: boolean
  error: boolean
  all: boolean
}

export const tail = (options: TailOptions) => {
  try {
    let cmd = `tail -f ${SolvConfig.LOG_PATH}`
    if (options.error) {
      cmd += ` | grep '\\(WARN\\|ERR\\)'`
    } else if (options.info) {
      cmd += ` | grep INFO`
    } else if (options.warning) {
      cmd += ` | grep WARN`
    } else {
    }

    console.log(cmd)
    const child = spawn(cmd, { shell: true, stdio: 'inherit' })

    child.on('error', (error) => {
      throw new Error(`tail Error: ${error}`)
    })
  } catch (error) {
    throw new Error(`tail Error: ${error}`)
  }
}
