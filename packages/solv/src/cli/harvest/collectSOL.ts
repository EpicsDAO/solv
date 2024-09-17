import { getAllKeyPaths } from '@/config/config'
import { execSync, spawnSync } from 'node:child_process'
import { getHarvestBalance } from './getHarvestBalance'
import getBalance, { KeyType } from '@/lib/solana/getBalance'
import chalk from 'chalk'
import { solanaTransfer } from '@/lib/solana/solanaTransfer'
import { readFile } from 'fs/promises'
import { LAMPORTS_PER_SOL } from '@solana/web3.js'

// Collect SOL from Vote Account to Authority Account and Validator Account to Authority Account
// 1. Withdraw all SOL from Vote Account to Authority Account
// 2. Transfer SOL from Validator Account to Authority Account

export const collectSOL = async (rpcUrl: string) => {
  const { mainnetValidatorAuthorityKey, mainnetValidatorKey } = getAllKeyPaths()

  // Check Vote Account Balance
  const voteAccountBalance = await getBalance(rpcUrl, KeyType.VOTE)

  // Skip this step if Vote Account Balance is less than 1 SOL
  if (voteAccountBalance < 1) {
    console.log(chalk.white('Vote Account Balance is less than 1 SOL'))
    console.log(
      chalk.white(
        'Skip withdrawing SOL from Vote Account to Authority Account',
      ),
    )
  } else {
    // Withdraw all SOL from Vote Account to Authority Account
    const cmd = `solv withdraw --all`
    spawnSync(cmd, { shell: true, stdio: 'inherit' })
  }

  // Check Validator Key Balance
  const validatorTransferableBalance = await getHarvestBalance(rpcUrl)
  console.log(
    chalk.white(`Transferable Balance: ${validatorTransferableBalance} SOL`),
  )
  const transferLamports = validatorTransferableBalance * LAMPORTS_PER_SOL

  // Skip this step if Validator Account Balance is less than 1 SOL
  if (validatorTransferableBalance < 1) {
    console.log(chalk.white('Validator Account Balance is less than 1 SOL'))
    console.log(
      chalk.white(
        'Skip transferring SOL from Validator Account to Authority Account',
      ),
    )
  } else {
    // Transfer SOL from Validator Account to Authority Account
    const toAddress = execSync(
      `solana address --keypair ${mainnetValidatorAuthorityKey}`,
    )
      .toString()
      .trim()

    const fromWalletKey = JSON.parse(
      await readFile(mainnetValidatorKey, 'utf-8'),
    ) as number[]

    await solanaTransfer(rpcUrl, fromWalletKey, toAddress, transferLamports)
  }
  return true
}
