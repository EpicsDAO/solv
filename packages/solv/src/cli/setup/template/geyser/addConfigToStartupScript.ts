import { spawnSync } from 'node:child_process'
import { readFile, writeFile } from 'fs/promises'

const addConfigToStartupScript = async () => {
  const startupScriptPath = '/home/solv/start-validator.sh'
  const startupScript = await readFile(startupScriptPath, 'utf-8')
  // Add one line to the second from the last line of the startup script
  const lines = startupScript.split('\n')
  lines.splice(
    -1,
    0,
    '--geyser-plugin-config /home/solv/yellowstone-grpc/yellowstone-grpc-geyser/config.json \\',
  )
  const newStartupScript = lines.join('\n')
  await writeFile(startupScriptPath, newStartupScript)
  spawnSync(`chmod +x ${startupScriptPath}`, {
    shell: true,
    stdio: 'inherit',
  })
}

export default addConfigToStartupScript
