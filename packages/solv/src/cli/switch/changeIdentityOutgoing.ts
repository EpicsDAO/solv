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
import { spawnSync } from 'node:child_process'
import checkValidatorKey from './checkValidatorKey'
import { updateDefaultConfig } from '@/config/updateDefaultConfig'
import { DefaultConfigType } from '@/config/types'
import { Network, NodeType } from '@/config/enums'
import getSolanaCLI from '@/config/getSolanaCLI'

const unstakedKeyPath = join(SOLV_HOME, UNSTAKED_KEY)
const identityKeyPath = join(SOLV_HOME, IDENTITY_KEY)
const sshKeyPath = '~/.ssh/id_rsa'

export const changeIdentityOutgoing = async (
  ip: string,
  pubkey: string,
  config: DefaultConfigType,
) => {
  const isTestnet = config.NETWORK === Network.TESTNET
  const isRPC = config.NODE_TYPE === NodeType.RPC
  let validatorKeyPath = isTestnet
    ? TESTNET_VALIDATOR_KEY_PATH
    : MAINNET_VALIDATOR_KEY_PATH
  if (isRPC) {
    validatorKeyPath = TESTNET_VALIDATOR_KEY_PATH
  }
  let solanaClient = getSolanaCLI()

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
  const step6 = `ln -sf ${validatorKeyPath} ${IDENTITY_KEY_PATH}`

  console.log(chalk.white('🟢 Waiting for restart window...'))
  const result1 = spawnSync(step1, { shell: true, stdio: 'inherit' })
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
  const result2 = spawnSync(step2, { shell: true, stdio: 'inherit' })
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
  const result3 = spawnSync(step3, { shell: true, stdio: 'inherit' })
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
  const result4 = spawnSync(step4, { shell: true, stdio: 'inherit' })
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
  const cmd5 = `ssh -i ${sshKeyPath} -o StrictHostKeyChecking=no solv@${ip} -p 22 'cd ~ && source ~/.profile && ${step5}'`
  const result5 = spawnSync(cmd5, { shell: true, stdio: 'inherit' })
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
  const cmd6 = `ssh -i ${sshKeyPath} -o StrictHostKeyChecking=no solv@${ip} -p 22 'cd ~ && source ~/.profile && ${step6}'`
  const result6 = spawnSync(cmd6, { shell: true, stdio: 'inherit' })
  if (result6.status !== 0) {
    console.log(
      chalk.yellow(
        `⚠️ Symlink Failed. Please check your Validator\n\nFailed Cmd: ${step6}`,
      ),
    )
    return
  }
  console.log(chalk.white('🟢 Identity changed successfully!'))
  await updateDefaultConfig({
    IS_DUMMY: true,
  })
}
