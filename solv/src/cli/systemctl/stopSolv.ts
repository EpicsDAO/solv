import type { DefaultConfigType } from '@/config/defaultConfig.ts'
import { ValidatorType } from '@/config/enums.ts'
import { spawnSync } from 'jsr:@elsoul/child-process'

export const stopSolv = async (config: DefaultConfigType) => {
  const service = config.VALIDATOR_TYPE === ValidatorType.FRANKENDANCER
    ? 'frankendancer'
    : 'solv'
  const cmd = `sudo systemctl stop ${service}`
  return await spawnSync(cmd)
}
