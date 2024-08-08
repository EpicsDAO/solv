import {
  IDENTITY_KEY,
  IDENTITY_KEY_PATH,
  LEDGER_PATH,
  MAINNET_VALIDATOR_KEY_PATH,
  SOLV_HOME,
  UNSTAKED_KEY,
} from '@/config/constants'
import { join } from 'path'
import { spawnSync } from 'node:child_process'
import chalk from 'chalk'

const unstakedKeyPath = join(SOLV_HOME, UNSTAKED_KEY)
const identityKeyPath = join(SOLV_HOME, IDENTITY_KEY)

export const changeIdentityIncoming = async (ip: string, pubkey: string) => {
  console.log(chalk.white('🟢 Waiting for restart window...'))
  const restartWindowCmd = `ssh -i ~/.ssh/id_rsa -o StrictHostKeyChecking=no solv@${ip} -p 22 'cd ~ && source ~/.profile && solana-validator -l ${LEDGER_PATH} wait-for-restart-window --min-idle-time 2 --skip-new-snapshot-check'`
  spawnSync(restartWindowCmd, { shell: true, stdio: 'inherit' })

  // Set the identity on the unstaked key
  console.log(chalk.white('🟢 Setting identity on the new validator...'))
  const setIdentityCmd = `ssh -i ~/.ssh/id_rsa -o StrictHostKeyChecking=no solv@${ip} -p 22 'cd ~ && source ~/.profile && solana-validator -l ${LEDGER_PATH} set-identity ${unstakedKeyPath}'`
  spawnSync(setIdentityCmd, { shell: true, stdio: 'inherit' })

  // Change the Symlink to the unstaked keypair
  console.log(
    chalk.white('🟢 Changing the Symlink to the new validator keypair...'),
  )
  spawnSync(
    `ssh -i ~/.ssh/id_rsa -o StrictHostKeyChecking=no solv@${ip} -p 22 'cd ~ && source ~/.profile && ln -sf ${unstakedKeyPath} ${identityKeyPath}'`,
    {
      shell: true,
      stdio: 'inherit',
    },
  )

  // Download the tower file to the new validator
  console.log(
    chalk.white('🟢 Uploading the tower file to the new validator...'),
  )
  spawnSync(
    `scp solv@${ip}:${LEDGER_PATH}/tower-1_9-${pubkey}.bin ${LEDGER_PATH}`,
    { shell: true, stdio: 'inherit' },
  )

  // Set the identity on the new validator
  console.log(chalk.white('🟢 Setting identity on the new validator...'))
  spawnSync(
    `solana-validator -l ${LEDGER_PATH} set-identity --require-tower ${MAINNET_VALIDATOR_KEY_PATH} && ln -sf ${MAINNET_VALIDATOR_KEY_PATH} ${IDENTITY_KEY_PATH}`,
    {
      shell: true,
      stdio: 'inherit',
    },
  )

  console.log(chalk.white('🟢 Identity changed successfully!'))
}
