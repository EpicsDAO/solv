import { SOLANA_RPC_URL, program } from '@/index'
import { ConfigParams } from '@/lib/readOrCreateDefaultConfig'
import { collectSOL } from './collectSOL'
import getBalance, { KeyType } from '@/lib/solana/getBalance'
import sleep from '@/lib/sleep'
import { elSOLdeposit } from '../stake/elSOLdeposit'
import {
  ELSOL_MINT_ADDRESS,
  SOLV_STAKE_POOL_ADDRESS,
  getAllKeyPaths,
} from '@/config/config'
import { readFile } from 'fs/promises'
import inquirer from 'inquirer'
import { validateSolanaKey } from '../transfer'
import { updateSolvConfig } from '@/lib/updateSolvConfig'
import getElSOLBalance from '@/lib/solana/getElSOLBalance'
import { spawnSync } from 'child_process'

export const harvestCommands = (solvConfig: ConfigParams) => {
  program
    .command('harvest')
    .alias('hv')
    .description('Harvest SOL from Validator Account to Authority Account')
    .action(async () => {
      const harvestAddress = await getHarvestAddress(solvConfig)
      console.log('Harvesting SOL...')
      collectSOL()
      let voteBalance = getBalance(KeyType.VOTE)
      let retryCount = 0
      while (voteBalance > 1 && retryCount < 3) {
        console.log('Retrying Harvesting SOL...')
        await sleep(1000)
        collectSOL()
        voteBalance = getBalance(KeyType.VOTE)
        retryCount++
      }

      // Convert SOL to elSOL
      const authorityBalance = getBalance(KeyType.AUTH)
      if (authorityBalance < 1) {
        console.log('Authority Account Balance is less than 1 SOL')
        return
      }
      const convertibleBalance = authorityBalance - 0.03
      const { mainnetValidatorAuthorityKey } = getAllKeyPaths()
      const fromWalletKey = JSON.parse(
        await readFile(mainnetValidatorAuthorityKey, 'utf-8'),
      ) as number[]
      const result = await elSOLdeposit(
        SOLV_STAKE_POOL_ADDRESS,
        convertibleBalance,
        fromWalletKey,
      )
      if (!result) {
        throw new Error('Failed to convert SOL to elSOL')
      }

      // Transfer elSOL to Harvest Address
      const elSOLBalance = await getElSOLBalance()
      if (elSOLBalance === 0) {
        console.log('elSOL Balance is 0')
        return
      }
      spawnSync(
        `spl-token transfer ${ELSOL_MINT_ADDRESS} ${elSOLBalance} ${harvestAddress} --from ${mainnetValidatorAuthorityKey} --url ${SOLANA_RPC_URL}`,
        {
          shell: true,
          stdio: 'inherit',
        },
      )
    })
}

export const getHarvestAddress = async (solvConfig: ConfigParams) => {
  try {
    const harvestAddress = solvConfig.config.HARVEST_ACCOUNT
    if (!harvestAddress) {
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
