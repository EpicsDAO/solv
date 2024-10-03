import { ValidatorType } from '@/config/enums'
import { DefaultConfigType } from '@/config/types'
import { spawnSync } from 'node:child_process'

export const startSolana = (config: DefaultConfigType) => {
  const service =
    config.VALIDATOR_TYPE === ValidatorType.FRANKENDANCER
      ? 'frankendancer'
      : 'solv'
  const cmd = [`sudo systemctl start ${service}`]
  spawnSync(cmd[0], { shell: true, stdio: 'inherit' })
}
