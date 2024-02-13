import { spawnSync } from 'child_process'
import inquirer from 'inquirer'

export const updateCommission = (commission: number, isTest = true) => {
  const validatorKeypair = isTest
    ? '/home/solv/testnet-validator-keypair.json'
    : '/home/solv/mainnet-validator-keypair.json'
  const voteAccountKeypair = isTest
    ? '/home/solv/testnet-vote-account-keypair.json'
    : '/home/solv/mainnet-vote-account-keypair.json'
  const network = isTest ? 'testnet' : 'mainnet-beta'
  const cmd = `solana vote-update-commission ${voteAccountKeypair} ${commission} ${validatorKeypair} --url https://api.${network}.solana.com --keypair ${validatorKeypair}`
  spawnSync(cmd, { shell: true, stdio: 'inherit' })
}

export type UpdateCommissionAsk = {
  commission: number
}

export const updateCommissionAsk = async () => {
  const ansewr = await inquirer.prompt<UpdateCommissionAsk>([
    {
      type: 'number',
      name: 'commission',
      message: 'Enter new commission',
      default: 7,
    },
  ])
  return ansewr
}
