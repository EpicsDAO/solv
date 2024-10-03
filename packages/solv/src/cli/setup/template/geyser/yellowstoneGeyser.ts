import { spawnSync } from 'node:child_process'
import geyserConfig from './geyserConfig'
import addConfigToStartupScript from './addConfigToStartupScript'
import inquirer from 'inquirer'
import { writeFile } from 'node:fs/promises'

export const yellowstoneGeyser = async () => {
  const xTokenAnswer = await inquirer.prompt<{ xToken: string }>([
    {
      type: 'input',
      name: 'xToken',
      message: 'Enter the xToken',
      default: 'xToken',
    },
  ])
  const xToken = xTokenAnswer.xToken
  const cmd = `git clone https://github.com/rpcpool/yellowstone-grpc.git`
  const cmd2 = `cargo build -r`
  const cmd3 = `cargo-fmt && cargo run --bin config-check -- --config yellowstone-grpc-geyser/config.json`
  spawnSync(cmd, { shell: true, stdio: 'inherit' })
  spawnSync(cmd2, {
    shell: true,
    stdio: 'inherit',
    cwd: '/home/solv/yellowstone-grpc',
  })
  spawnSync(cmd3, {
    shell: true,
    stdio: 'inherit',
    cwd: '/home/solv/yellowstone-grpc',
  })
  const { filePath, defaultConfig } = geyserConfig(xToken)
  const jsonString = JSON.stringify(defaultConfig, null, 2)
  await writeFile(filePath, jsonString, { encoding: 'utf8' })

  // Add config to startup script
  await addConfigToStartupScript()
}
