import { LEDGER_PATH } from '@/config/constants'
import getSolanaCLI from '@/config/getSolanaCLI'
import { DefaultConfigType } from '@/config/types'
import { spawnSync } from 'node:child_process'

export const monitorSolana = (config: DefaultConfigType) => {
  const solanaValidatorClient = getSolanaCLI()
  const cmd = `${solanaValidatorClient} --ledger ${LEDGER_PATH} monitor`
  spawnSync(cmd, { shell: true, stdio: 'inherit' })
}
