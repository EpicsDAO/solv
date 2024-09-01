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
import chalk from 'chalk'
import scpSSH from '@/lib/scpSSH'
import { spawnSync } from 'node:child_process'
import checkValidatorKey from './checkValidatorKey'

const unstakedKeyPath = join(SOLV_HOME, UNSTAKED_KEY)
const identityKeyPath = join(SOLV_HOME, IDENTITY_KEY)

export const changeIdentityOutgoing = async (
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

  // Commands to run on the source validator - SpawnSync
  const step1 = `${solanaClient} -l ${LEDGER_PATH} wait-for-restart-window --min-idle-time 2 --skip-new-snapshot-check`
  const step2 = `${solanaClient} -l ${LEDGER_PATH} set-identity ${unstakedKeyPath}`
  const step3 = `ln -sf ${unstakedKeyPath} ${identityKeyPath}`
  const step4 = `scp ${LEDGER_PATH}/tower-1_9-${pubkey}.bin solv@${ip}:${LEDGER_PATH}`

  // SCP Command to run on the destination validator - scpSSH
  const step5 = `${solanaClient} -l ${LEDGER_PATH} set-identity --require-tower ${validatorKeyPath}`
  const step6 = `ln -sf ${MAINNET_VALIDATOR_KEY_PATH} ${IDENTITY_KEY_PATH}`

  console.log(chalk.white('🟢 Waiting for restart window...'))
  const result1 = spawnSync(step1, { shell: true, stdio: 'pipe' })
  if (result1.status !== 0) {
    console.log(
      chalk.yellow(
        `⚠️ wait-for-restart-window Failed. Please check your Validator\n\nFailed Cmd: ${step1}`,
      ),
    )
    return
  }

  // Set the identity to the unstaked key
  console.log(chalk.white('🟢 Setting identity on the new validator...'))
  const result2 = spawnSync(step2, { shell: true, stdio: 'pipe' })
  if (result2.status !== 0) {
    console.log(
      chalk.yellow(
        `⚠️ set-identity Failed. Please check your Validator\n\nFailed Cmd: ${step2}`,
      ),
    )
    return
  }

  // Change the Symlink to the unstaked keypair
  console.log(
    chalk.white('🟢 Changing the Symlink to the new validator keypair...'),
  )
  const result3 = spawnSync(step3, { shell: true, stdio: 'pipe' })
  if (result3.status !== 0) {
    console.log(
      chalk.yellow(
        `⚠️ Symlink Failed. Please check your Validator\n\nFailed Cmd: ${step3}`,
      ),
    )
    return
  }

  // Upload the tower file to the new validator
  console.log(
    chalk.white('🟢 Uploading the tower file to the new validator...'),
  )
  const result4 = spawnSync(step4, { shell: true, stdio: 'pipe' })
  if (result4.status !== 0) {
    console.log(
      chalk.yellow(
        `⚠️ Upload Tower File Failed. Please check your Validator\n\nFailed Cmd: ${step4}`,
      ),
    )
    return
  }

  // Set the identity on the identity key
  console.log(chalk.white('🟢 Setting identity on the new validator...'))
  const result5 = scpSSH(ip, step5)
  console.log('result5', result5.status)
  if (result5.status !== 0) {
    console.log(
      chalk.yellow(
        `⚠️ set-identity Failed. Please check your Validator\n$ ssh solv@${ip}\n\nFailed Cmd: ${step5}`,
      ),
    )
    //return
  }

  // Change the Symlink to the identity keypair
  console.log(
    chalk.white('🟢 Changing the Symlink to the new validator keypair...'),
  )
  const result6 = scpSSH(ip, step6)
  console.log('result6', result6.status)
  if (result6.status !== 0) {
    console.log(
      chalk.yellow(
        `⚠️ Symlink Failed. Please check your Validator\n\nFailed Cmd: ${step6}`,
      ),
    )
    return
  }
  console.log(chalk.white('🟢 Identity changed successfully!'))
}
