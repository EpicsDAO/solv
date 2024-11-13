import type { DefaultConfigType } from '@/config/defaultConfig.ts'
import { ValidatorType } from '@/config/enums.ts'
import { spawnSync } from 'jsr:@elsoul/child-process'

export const restartSolv = async (config: DefaultConfigType) => {
  const service = config.VALIDATOR_TYPE === ValidatorType.FRANKENDANCER
    ? 'frankendancer'
    : 'solv'
  const cmd = `sudo systemctl restart ${service}`
  return await spawnSync(cmd)
}
