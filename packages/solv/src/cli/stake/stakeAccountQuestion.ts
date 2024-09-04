import inquirer from 'inquirer'
import { createStakeAccount } from './createStakeAccount'
import { updateSolvConfig } from '@/lib/updateSolvConfig'
import { DefaultConfigType } from '@/config/types'
import { Network } from '@/config/enums'
import { addLeadingZero, existsAsync } from '@skeet-framework/utils'
import { execSync, spawnSync } from 'node:child_process'
import os from 'node:os'

export type StakeAccountQuestion = {
  stakeAuthorityKeyPath: string
  solAmount: string
}

export const stakeAccountQuestion = async (config: DefaultConfigType) => {
  const isTestnet = config.NETWORK === Network.TESTNET
  const confirmCreateStakeAccount = await inquirer.prompt<{
    confirmCreateStakeAccount: boolean
  }>([
    {
      type: 'confirm',
      name: 'confirmCreateStakeAccount',
      message: 'Would you like to create a new stake account?',
      default: false,
    },
  ])
  if (!confirmCreateStakeAccount.confirmCreateStakeAccount) {
    return false
  }
  const authorityKeypair = isTestnet
    ? '~/testnet-authority-keypair.json'
    : '~/mainnet-authority-keypair.json'
  spawnSync(`solana config set --keypair ${authorityKeypair}`, {
    shell: true,
    stdio: 'pipe',
  })
  const answer = await inquirer.prompt<StakeAccountQuestion>([
    {
      type: 'input',
      name: 'solAmount',
      message: 'How many SOL would you like to stake?',
      default: '1',
    },
  ])
  const { stakeKeypair, stakeKeypairPath } = await createStakeKeypair()

  const currentStakeAccount = config.STAKE_ACCOUNTS
  // Array of unique stake accounts
  const uniqueStakeAccount = Array.from(
    new Set([...currentStakeAccount, stakeKeypair]),
  )
  updateSolvConfig({ STAKE_ACCOUNT: uniqueStakeAccount })
  return createStakeAccount(stakeKeypairPath, Number(answer.solAmount))
}

const homeDirectory = os.userInfo().homedir
const STAKE_ACCOUNT_DIR = homeDirectory + '/stake-account'

export type StakeKeypair = {
  stakeKeypair: string
  stakeKeypairPath: string
}

const createStakeKeypair = async (): Promise<StakeKeypair> => {
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
  spawnSync(cmd, { shell: true, stdio: 'inherit' })
  const output = execSync(`solana-keygen pubkey ${outfile}`)
  return {
    stakeKeypair: output.toString().trim(),
    stakeKeypairPath: outfile,
  } as StakeKeypair
}
