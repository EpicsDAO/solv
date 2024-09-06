import { startupScriptPaths } from '@/config/config'
import { spawn } from 'node:child_process'

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
    const child = spawn(cmd, { shell: true, stdio: 'inherit' })
    const childPid = child.pid
    if (!childPid) {
      throw new Error('Failed to start tail process')
    }

    // Handle the SIGINT signal (Ctrl+C)
    process.on('SIGINT', () => {
      console.log('Caught interrupt signal, stopping tail...')
      process.kill(childPid, 'SIGINT') // Send SIGINT to child process
      process.exit(0)
    })

    child.on('exit', (code, signal) => {
      if (signal === 'SIGINT') {
        console.log('Child process terminated due to receipt of SIGINT signal')
        process.exit(0)
      } else if (code !== 0) {
        console.error(`Child process exited with code ${code}`)
        process.exit(code)
      }
    })

    child.on('error', (error) => {
      console.error(`tail Error: ${error}`)
      process.kill(childPid, 'SIGINT') // Ensure child process is terminated on error
      process.exit(1)
    })
  } catch (error) {
    console.error(`tail Error: ${error}`)
    process.exit(1)
  }
}
