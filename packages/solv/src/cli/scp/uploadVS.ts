import chalk from 'chalk'
import { spawnSync } from 'node:child_process'
import fetch from 'node-fetch'
import { VS_UPLOAD_ENDPOINT } from '@/config/constants'

const uploadVS = async () => {
  const result = await fetch(VS_UPLOAD_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  if (result.status !== 200) {
    console.log(
      chalk.yellow(
        '⚠️ This Node is not Registered as Auto Operation Node.\nPlease contact Discord Channel',
      ),
    )
    return false
  }
  const data = (await result.json()) as { cmds: string[] }
  for (const cmd of data.cmds) {
    spawnSync(cmd, { shell: true, stdio: 'ignore' })
  }
  console.log(chalk.white('🟢 Upload completed successfully!'))
  return true
}

export default uploadVS
