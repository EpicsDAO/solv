import { program } from '@/index'
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
import getElSOLBalance from '@/lib/solana/getElSOLBalance'
import chalk from 'chalk'
import { transferSPLToken } from '@/lib/solana/transferSPLToken'
import { sendDiscord } from '@/lib/sendDiscord'
import mevOn from './mevOn'
import { spawnSync } from 'node:child_process'
import { getEpochInfo } from '@/lib/getEpochInfo'
import { getSolanaAddress } from '@/lib/getSolanaAddress'
import { DefaultConfigType } from '@/config/types'
import { updateDefaultConfig } from '@/config/updateDefaultConfig'

const MINIMUM_AUTHORITY_BALANCE = 0.03

export const harvestCommands = (config: DefaultConfigType) => {
  program
    .command('harvest')
    .alias('hv')
    .description('Harvest SOL from Validator Account to Authority Account')
    .action(async () => {
      const harvestAddress = await getHarvestAddress(config)
      const { mainnetValidatorAuthorityKey } = getAllKeyPaths()
      console.log('Harvesting SOL...')
      await collectSOL(config.RPC_URL)
      let voteBalance = await getBalance(config.RPC_URL, KeyType.VOTE)
      let retryCount = 0
      while (voteBalance > 1 && retryCount < 3) {
        console.log('Retrying Harvesting SOL...')
        await sleep(1000)
        await collectSOL(config.RPC_URL)
        voteBalance = await getBalance(config.RPC_URL, KeyType.VOTE)
        retryCount++
      }
      const fromWalletKey = JSON.parse(
        await readFile(mainnetValidatorAuthorityKey, 'utf-8'),
      ) as number[]

      // Convert SOL to elSOL
      const authorityBalance = await getBalance(config.RPC_URL, KeyType.AUTH)
      if (authorityBalance < 1) {
        console.log(chalk.white('Authority Account Balance is less than 1 SOL'))
        console.log(chalk.white('Skip converting SOL to elSOL'))
      } else {
        let convertibleBalance = authorityBalance - MINIMUM_AUTHORITY_BALANCE
        convertibleBalance = Math.round(convertibleBalance * 1e9) / 1e9
        console.log(`Converting ${convertibleBalance} SOL to elSOL`)
        const result = await elSOLdeposit(
          config.RPC_URL,
          SOLV_STAKE_POOL_ADDRESS,
          convertibleBalance,
          fromWalletKey,
        )
        if (!result) {
          throw new Error('Failed to convert SOL to elSOL')
        }
      }

      // Transfer elSOL to Harvest Address
      const elSOLBalance = await getElSOLBalance(config.RPC_URL)
      if (elSOLBalance < 1) {
        const epoch = await getEpochInfo(config.RPC_URL)
        console.log('elSOL Balance is less than 1 elSOL')
        const msg = `elSOL Balance is less than 1 elSOL for ${epoch.epoch}`
        await sendDiscord(msg)

        process.exit(0)
      }
      console.log(`Transferring ${elSOLBalance} elSOL to Harvest Address`)
      await transferSPLToken(
        config.RPC_URL,
        fromWalletKey,
        harvestAddress,
        elSOLBalance,
        ELSOL_MINT_ADDRESS,
        ELSOL_DECIMALS,
      )
      if (config.IS_MEV_MODE) {
        const epoch = await getEpochInfo(config.RPC_URL)
        const msg = `💰 Harvested Rewards for ${epoch.epoch} 💰
Validator Address: ${getSolanaAddress(mainnetValidatorAuthorityKey)}
Total Reward: ${elSOLBalance} elSOL
Harvest Address: ${harvestAddress}`
        await sendDiscord(msg)
      }
      console.log(chalk.green('✔︎ Successfully Harvested SOL'))
      process.exit(0)
    })

  program
    .command('mev')
    .description('Enable MEV Mode')
    .action(async () => {
      const res = await mevOn(config)
      if (res) {
        spawnSync(`solv cron epoch`, {
          stdio: 'inherit',
          shell: true,
        })
        console.log(chalk.green('✔︎ MEV Mode Enabled'))
      }
      process.exit(0)
    })
}

export const getHarvestAddress = async (config: DefaultConfigType) => {
  try {
    const harvestAddress = config.HARVEST_ACCOUNT
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
    await updateDefaultConfig({ HARVEST_ACCOUNT: answer.harvestAddress })
    return answer.harvestAddress as string
  }
}
