import { addLeadingZero, existsAsync } from '@skeet-framework/utils'
import { spawnSync } from 'node:child_process'
import os from 'node:os'

const homeDirectory = os.userInfo().homedir
const STAKE_ACCOUNT_DIR = homeDirectory + '/stake-account'

export const createStakeKeypair = async (): Promise<string> => {
  if (!(await existsAsync(STAKE_ACCOUNT_DIR))) {
    spawnSync(`mkdir -p ${STAKE_ACCOUNT_DIR}`, { shell: true })
  }

  const files = spawnSync(`ls ${STAKE_ACCOUNT_DIR}`, { shell: true })
    .stdout.toString()
    .split('\n')
    .filter((file) => file.includes('.json'))
  const stakeAccountNum = addLeadingZero(files.length + 1)

  const outfile = `${STAKE_ACCOUNT_DIR}/stake${stakeAccountNum}.json`
  const cmd = `solana-keygen new --outfile ${outfile} --no-bip39-passphrase`
  const result = spawnSync(cmd, { shell: true, stdio: 'pipe' })

  const output = result.stdout.toString()
  const match = output.match(/pubkey: (\S+)/)
  if (!match)
    throw new Error('Failed to create stake account or extract pubkey.')

  return match[1]
}
