import { SOLANA_RPC_URL, program } from '@/index'
import { ConfigParams } from '@/lib/readOrCreateDefaultConfig'
import { collectSOL } from './collectSOL'
import getBalance, { KeyType } from '@/lib/solana/getBalance'
import sleep from '@/lib/sleep'
import { elSOLdeposit } from '../stake/elSOLdeposit'
import {
  ELSOL_DECIMALS,
  ELSOL_MINT_ADDRESS,
  SOLV_STAKE_POOL_ADDRESS,
  getAllKeyPaths,
} from '@/config/config'
import { readFile } from 'fs/promises'
import inquirer from 'inquirer'
import { validateSolanaKey } from '../transfer'
import { updateSolvConfig } from '@/lib/updateSolvConfig'
import getElSOLBalance from '@/lib/solana/getElSOLBalance'
import chalk from 'chalk'
import { transferSPLToken } from '@/lib/solana/transferSPLToken'
import { sendDiscord } from '@/lib/sendDiscord'
import mevOn from './mevOn'
import { spawnSync } from 'child_process'
import { getEpochInfo } from '@/lib/getEpochInfo'
import { getSolanaAddress } from '@/lib/getSolanaAddress'

const MINIMUM_AUTHORITY_BALANCE = 0.03

export const harvestCommands = (solvConfig: ConfigParams) => {
  program
    .command('harvest')
    .alias('hv')
    .description('Harvest SOL from Validator Account to Authority Account')
    .action(async () => {
      const harvestAddress = await getHarvestAddress(solvConfig)
      const { mainnetValidatorAuthorityKey } = getAllKeyPaths()
      console.log('Harvesting SOL...')
      await collectSOL()
      let voteBalance = await getBalance(SOLANA_RPC_URL, KeyType.VOTE)
      let retryCount = 0
      while (voteBalance > 1 && retryCount < 3) {
        console.log('Retrying Harvesting SOL...')
        await sleep(1000)
        await collectSOL()
        voteBalance = await getBalance(SOLANA_RPC_URL, KeyType.VOTE)
        retryCount++
      }
      const fromWalletKey = JSON.parse(
        await readFile(mainnetValidatorAuthorityKey, 'utf-8'),
      ) as number[]

      // Convert SOL to elSOL
      const authorityBalance = await getBalance(SOLANA_RPC_URL, KeyType.AUTH)
      if (authorityBalance < 1) {
        console.log(chalk.white('Authority Account Balance is less than 1 SOL'))
        console.log(chalk.white('Skip converting SOL to elSOL'))
      } else {
        let convertibleBalance = authorityBalance - MINIMUM_AUTHORITY_BALANCE
        convertibleBalance = Math.round(convertibleBalance * 1e9) / 1e9
        console.log(`Converting ${convertibleBalance} SOL to elSOL`)
        const result = await elSOLdeposit(
          SOLV_STAKE_POOL_ADDRESS,
          convertibleBalance,
          fromWalletKey,
        )
        if (!result) {
          throw new Error('Failed to convert SOL to elSOL')
        }
      }

      // Transfer elSOL to Harvest Address
      const elSOLBalance = await getElSOLBalance()
      if (elSOLBalance < 1) {
        const epoch = await getEpochInfo(SOLANA_RPC_URL)
        console.log('elSOL Balance is less than 1 elSOL')
        const msg = `elSOL Balance is less than 1 elSOL for ${epoch.epoch}`
        await sendDiscord(msg)

        return
      }
      console.log(`Transferring ${elSOLBalance} elSOL to Harvest Address`)
      await transferSPLToken(
        SOLANA_RPC_URL,
        fromWalletKey,
        harvestAddress,
        elSOLBalance,
        ELSOL_MINT_ADDRESS,
        ELSOL_DECIMALS,
      )
      if (solvConfig.config.IS_MEV_MODE) {
        const epoch = await getEpochInfo(SOLANA_RPC_URL)
        const msg = `💰 Harvested Rewards for ${epoch.epoch} 💰
Validator Address: ${getSolanaAddress(mainnetValidatorAuthorityKey)}
Total Reward: ${elSOLBalance} elSOL
Harvest Address: ${harvestAddress}`
        await sendDiscord(msg)
      }
      console.log(chalk.green('✔︎ Successfully Harvested SOL'))
    })

  program
    .command('mev')
    .description('Enable MEV Mode')
    .action(async () => {
      const res = await mevOn(solvConfig)
      if (res) {
        spawnSync(`solv cron epoch`, {
          stdio: 'inherit',
          shell: true,
        })
        console.log(chalk.green('✔︎ MEV Mode Enabled'))
      }
    })
}

export const getHarvestAddress = async (solvConfig: ConfigParams) => {
  try {
    const harvestAddress = solvConfig.config.HARVEST_ACCOUNT
    if (harvestAddress === '') {
      throw new Error('Harvest Address not found')
    }
    return harvestAddress
  } catch (error) {
    const answer = await inquirer.prompt([
      {
        type: 'input',
        name: 'harvestAddress',
        message: 'Enter Harvest Address',
        validate: validateSolanaKey,
      },
    ])
    updateSolvConfig({ HARVEST_ACCOUNT: answer.harvestAddress })
    return answer.harvestAddress as string
  }
}
