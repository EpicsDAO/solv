import { KEYPAIRS } from '@/config/config'
import { ConfigParams } from '@/lib/readOrCreateDefaultConfig'
import { spawnSync } from 'child_process'
import inquirer from 'inquirer'
import * as Table from 'cli-table3'
import chalk from 'chalk'

export const solanaValidatorsGrep = async (solvConfig: ConfigParams) => {
  let voteAccountPath = `~/solvKeys/upload/`
  if (solvConfig.config.SOLANA_NETWORK === 'mainnet-beta') {
    voteAccountPath =
      voteAccountPath + '/' + KEYPAIRS.MAINNET_VALIDATOR_VOTE_KEY
  } else if (solvConfig.config.SOLANA_NETWORK === 'testnet') {
    voteAccountPath =
      voteAccountPath + '/' + KEYPAIRS.TESTNET_VALIDATOR_VOTE_KEY
  }
  console.log('Default Path:', voteAccountPath)
  const { stdout } = spawnSync('solana address --keypair ' + voteAccountPath, {
    shell: true,
    stdio: 'pipe',
  })
  const voteAccountAddress = stdout.toString().trim()
  const answer = await inquirer.prompt<{ pubkey: string }>([
    {
      name: 'pubkey',
      type: 'input',
      message: 'Enter the validator pubkey',
      default() {
        return voteAccountAddress
      },
    },
  ])
  try {
    const cmd = `solana validators | grep ${answer.pubkey}`
    const { stdout } = spawnSync(cmd, { shell: true, encoding: 'utf8' })
    const output = stdout.toString().trim()

    if (output === '') {
      console.log(
        chalk.yellow(
          `\n⚠️ Not Found - ${answer.pubkey}\n👷‍♀️ Please check your Validator Node\n`,
        ),
      )
    } else {
      // 結果を空白で分割
      const values = output.split(/\s+/)

      // ヘッダーの配列
      const headers = [
        'Identity',
        'Vote Account',
        'Commission',
        'Last Vote',
        'Root Slot',
        'Skip Rate',
        'Credits',
        'Version',
        'Active Stake',
      ]
      const table = new Table.default()
      const data = {
        identity: values[0],
        voteAccount: values[1],
        commission: values[2],
        lastVote: values[3] + values[4] + values[5],
        rootSlot: values[6] + values[7] + values[8],
        skipRate: values[9],
        credits: values[10],
        version: values[11],
        activeStake: values[12] + values[13] + values[14],
      }
      for (const header of Object.keys(data) as (keyof typeof data)[]) {
        table.push([chalk.blue(header), chalk.white(data[header])])
      }
      console.log(table.toString())
    }
  } catch (error) {
    console.log(`Error: ${error}`)
  }
}
