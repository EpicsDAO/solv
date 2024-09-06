import { startupScriptPaths } from '@/config/config'
import { spawnSync } from 'node:child_process'

export type TailOptions = {
  info: boolean
  warning: boolean
  error: boolean
  all: boolean
}

export const tail = (options: TailOptions) => {
  try {
    const { log } = startupScriptPaths()
    let cmd = `tail -f ${log}`
    if (options.error) {
      cmd += ` | grep '\\(WARN\\|ERR\\)'`
    } else if (options.info) {
      cmd += ` | grep INFO`
    } else if (options.warning) {
      cmd += ` | grep WARN`
    }

    console.log(cmd)
    const result = spawnSync(cmd, { shell: true, stdio: 'inherit' })

    if (result.error) {
      throw result.error
    }

    if (result.signal === 'SIGINT') {
      console.log('Child process terminated due to receipt of SIGINT signal')
      process.exit(0)
    } else if (result.status !== 0) {
      console.error(`Child process exited with code ${result.status}`)
      process.exit(result.status)
    }
  } catch (error) {
    console.error(`tail Error: ${error}`)
    process.exit(1)
  }
}
