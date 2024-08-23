import {
  IDENTITY_KEY,
  LEDGER_PATH,
  MAINNET_VALIDATOR_KEY_PATH,
  SOLV_HOME,
  TESTNET_VALIDATOR_KEY_PATH,
  UNSTAKED_KEY,
} from '@/config/constants'
import { join } from 'path'
import chalk from 'chalk'
import scpSSH from '@/lib/scpSSH'
import { getSolanaAddress } from '@/lib/getSolanaAddress'

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
  console.log(
    chalk.white('🟢 Checking If Destination Identity Key is the same...'),
  )
  const localValidatorIdentityAddress =
    getSolanaAddress(validatorKeyPath).trim()
  const destinationValidatorIdentityAddress = scpSSH(
    ip,
    `solana-keygen pubkey ${validatorKeyPath}`,
  )
    .stdout.toString()
    .trim()

  if (localValidatorIdentityAddress !== destinationValidatorIdentityAddress) {
    console.log(
      chalk.yellow(
        `⚠️ Destination Identity Key is different. Please check your Validator\n$ ssh solv@${ip}\n\nLocal Identity Key: ${localValidatorIdentityAddress}\nDestination Identity Key: ${destinationValidatorIdentityAddress}`,
      ),
    )
    return
  }

  console.log(chalk.white('🟢 Waiting for restart window...'))
  const restartWindowCmd = `${solanaClient} -l ${LEDGER_PATH} wait-for-restart-window --min-idle-time 2 --skip-new-snapshot-check`
  const result1 = scpSSH(ip, restartWindowCmd)
  if (result1.status !== 0) {
    console.log(
      chalk.yellow(
        `⚠️ wait-for-restart-window Failed. Please check your Validator\n$ ssh solv@${ip}\n\nFailed Cmd: ${restartWindowCmd}`,
      ),
    )
    return
  }

  // Set the identity to the unstaked key
  console.log(chalk.white('🟢 Setting identity on the new validator...'))
  const setIdentityCmd = `${solanaClient} -l ${LEDGER_PATH} set-identity ${unstakedKeyPath}`
  const result2 = scpSSH(ip, setIdentityCmd)
  if (result2.status !== 0) {
    console.log(
      chalk.yellow(
        `⚠️ set-identity Failed. Please check your Validator\n$ ssh solv@${ip}\n\nFailed Cmd: ${setIdentityCmd}`,
      ),
    )
    return
  }

  // Change the Symlink to the unstaked keypair
  console.log(
    chalk.white('🟢 Changing the Symlink to the new validator keypair...'),
  )
  const symlinkCmd = `ln -sf ${unstakedKeyPath} ${identityKeyPath}`
  const result3 = scpSSH(ip, symlinkCmd)
  if (result3.status !== 0) {
    console.log(
      chalk.yellow(
        `⚠️ Symlink Failed. Please check your Validator\n$ ssh solv@${ip}\n\nFailed Cmd: ${symlinkCmd}`,
      ),
    )
    return
  }

  // Upload the tower file to the new validator
  console.log(
    chalk.white('🟢 Uploading the tower file to the new validator...'),
  )
  const cpTowerCmd = `scp ${LEDGER_PATH}/tower-1_9-${pubkey}.bin solv@${ip}:${LEDGER_PATH}`
  const result4 = scpSSH(ip, cpTowerCmd)
  if (result4.status !== 0) {
    console.log(
      chalk.yellow(
        `⚠️ Upload Tower File Failed. Please check your Validator\n$ ssh solv@${ip}\n\nFailed Cmd: ${cpTowerCmd}`,
      ),
    )
    return
  }

  // Set the identity on the identity key
  console.log(chalk.white('🟢 Setting identity on the new validator...'))
  const setIdentityCmd2 = `${solanaClient} -l ${LEDGER_PATH} set-identity --require-tower ${validatorKeyPath}`
  const result5 = scpSSH(ip, setIdentityCmd2)
  if (result5.status !== 0) {
    console.log(
      chalk.yellow(
        `⚠️ set-identity Failed. Please check your Validator\n$ ssh solv@${ip}\n\nFailed Cmd: ${setIdentityCmd2}`,
      ),
    )
    return
  }
  console.log(chalk.white('🟢 Identity changed successfully!'))
}
