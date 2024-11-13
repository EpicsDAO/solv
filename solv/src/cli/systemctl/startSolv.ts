import { spawnSync } from 'jsr:@elsoul/child-process'
import type { DefaultConfigType } from '@/config/defaultConfig.ts'
import { ValidatorType } from '@/config/enums.ts'

export const startSolv = async (config: DefaultConfigType) => {
  const service = config.VALIDATOR_TYPE === ValidatorType.FRANKENDANCER
    ? 'frankendancer'
    : 'solv'
  await spawnSync(`sudo systemctl start ${service}`)
}
