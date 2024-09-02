import {
  IDENTITY_KEY,
  IDENTITY_KEY_PATH,
  LEDGER_PATH,
  MAINNET_VALIDATOR_KEY_PATH,
  SOLV_HOME,
  TESTNET_VALIDATOR_KEY_PATH,
  UNSTAKED_KEY,
} from '@/config/constants'
import { join } from 'path'
import { spawnSync } from 'node:child_process'
import chalk from 'chalk'
import checkValidatorKey from './checkValidatorKey'

const unstakedKeyPath = join(SOLV_HOME, UNSTAKED_KEY)
const identityKeyPath = join(SOLV_HOME, IDENTITY_KEY)

export const changeIdentityIncoming = async (
  ip: string,
  pubkey: string,
  isTestnet = false,
) => {
  const validatorKeyPath = isTestnet
    ? TESTNET_VALIDATOR_KEY_PATH
    : MAINNET_VALIDATOR_KEY_PATH
  const solanaClient = isTestnet ? 'agave-validator' : 'solana-validator'

  const isKeyOkay = checkValidatorKey(validatorKeyPath, ip)
  if (!isKeyOkay) {
    return
  }

  console.log(chalk.white('🟢 Waiting for restart window...'))
  const restartWindowCmd = `ssh -i ~/.ssh/id_rsa -o StrictHostKeyChecking=no solv@${ip} -p 22 'cd ~ && source ~/.profile && ${solanaClient} -l ${LEDGER_PATH} wait-for-restart-window --min-idle-time 2 --skip-new-snapshot-check'`
  const result1 = spawnSync(restartWindowCmd, { shell: true, stdio: 'inherit' })
  if (result1.status !== 0) {
    console.log(
      chalk.yellow(
        `⚠️ wait-for-restart-window Failed. Please check your Validator\n$ ssh solv@${ip}\n\nFailed Cmd: ${solanaClient} -l ${LEDGER_PATH} wait-for-restart-window --min-idle-time 2 --skip-new-snapshot-check`,
      ),
    )
    return
  }

  // Set the identity on the unstaked key
  console.log(chalk.white('🟢 Setting identity on the new validator...'))
  const setIdentityCmd = `ssh -i ~/.ssh/id_rsa -o StrictHostKeyChecking=no solv@${ip} -p 22 'cd ~ && source ~/.profile && ${solanaClient} -l ${LEDGER_PATH} set-identity ${unstakedKeyPath}'`
  const result2 = spawnSync(setIdentityCmd, { shell: true, stdio: 'inherit' })
  if (result2.status !== 0) {
    console.log(
      chalk.yellow(
        `⚠️ Set Identity Failed. Please check your Validator\n$ ssh solv@${ip}\n\nFailed Cmd: ${solanaClient} -l ${LEDGER_PATH} set-identity ${unstakedKeyPath}`,
      ),
    )
    return
  }

  // Change the Symlink to the unstaked keypair
  console.log(
    chalk.white('🟢 Changing the Symlink to the new validator keypair...'),
  )
  const result3 = spawnSync(
    `ssh -i ~/.ssh/id_rsa -o StrictHostKeyChecking=no solv@${ip} -p 22 'cd ~ && source ~/.profile && ln -sf ${unstakedKeyPath} ${identityKeyPath}'`,
    {
      shell: true,
      stdio: 'inherit',
    },
  )

  if (result3.status !== 0) {
    console.log(
      chalk.yellow(
        `⚠️ Chaning Identity Key Symlink Failed. Please check your Validator\n$ ssh solv@${ip}\n\nFailed Cmd: ln -sf ${unstakedKeyPath} ${identityKeyPath}`,
      ),
    )
    return
  }

  // Download the tower file to the new validator
  console.log(
    chalk.white('🟢 Uploading the tower file to the new validator...'),
  )
  const result4 = spawnSync(
    `scp solv@${ip}:${LEDGER_PATH}/tower-1_9-${pubkey}.bin ${LEDGER_PATH}`,
    { shell: true, stdio: 'inherit' },
  )
  if (result4.status !== 0) {
    console.log(
      chalk.yellow(
        `⚠️ Upload Tower File Failed. Please check your tower file\n$ ssh solv@${ip}\n\nFailed Cmd: scp solv@${ip}:${LEDGER_PATH}/tower-1_9-${pubkey}.bin ${LEDGER_PATH}`,
      ),
    )
    return
  }

  // Set the identity on the new validator
  console.log(chalk.white('🟢 Setting identity on the new validator...'))
  const result5 = spawnSync(
    `${solanaClient} -l ${LEDGER_PATH} set-identity --require-tower ${validatorKeyPath}`,
    {
      shell: true,
      stdio: 'inherit',
    },
  )
  console.log('result5', result5)
  if (result5.status !== 0) {
    console.log(
      chalk.yellow(
        `⚠️ Set Identity Failed. Please check your Validator\n\nFailed Cmd: ${solanaClient} -l ${LEDGER_PATH} set-identity --require-tower\nln -sf ${validatorKeyPath} ${IDENTITY_KEY_PATH}${validatorKeyPath}`,
      ),
    )
    // return
  }

  const result6 = spawnSync(`ln -sf ${validatorKeyPath} ${IDENTITY_KEY_PATH}`, {
    shell: true,
    stdio: 'inherit',
  })
  console.log('result6', result6.status)

  if (result6.status !== 0) {
    console.log(
      chalk.yellow(
        `⚠️ Chaning Identity Key Symlink Failed. Please check your Validator\n\nFailed Cmd: ln -sf ${validatorKeyPath} ${IDENTITY_KEY_PATH}`,
      ),
    )
    return
  }

  console.log(chalk.white('🟢 Identity changed successfully!'))
}
