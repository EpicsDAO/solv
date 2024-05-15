import { CONFIG, SERVICE_PATHS, SOLV_TYPES } from '@/config/config'
import { solvService } from '@/template/solvService'
import chalk from 'chalk'
import { execSync, spawnSync } from 'child_process'
import inquirer from 'inquirer'
import { genStartupValidatorScript } from './setup/genStartupValidatorScript'

export const migrate = async () => {
  // Ask for migration type
  const migrateType = await inquirer.prompt<{
    migrateType: string
    solvType: string
  }>([
    {
      name: 'migrateType',
      type: 'list',
      message: 'Which migration type do you want to perform?',
      choices: ['Testnet to Mainnet', 'Mainnet to Testnet'],
    },
    {
      name: 'solvType',
      type: 'list',
      message: 'Which solv types do you want to setup?',
      choices: ['SolanaClient', 'JitoClient'],
    },
  ])

  const isTest = migrateType.migrateType === 'Mainnet to Testnet' ? true : false
  const isJitoMev = migrateType.solvType === 'JitoClient' ? true : false
  const sType = isTest
    ? SOLV_TYPES.TESTNET_VALIDATOR
    : SOLV_TYPES.MAINNET_VALIDATOR

  // Delete the old config file
  spawnSync(`rm ${SERVICE_PATHS.SOL_SERVICE}`, { shell: true })
  spawnSync(`rm ${solvService}`, { shell: true })
  await genStartupValidatorScript(true, sType, isJitoMev)
  const body = solvService(isTest)
  // Create the new config file
  execSync(`echo "${body}" | sudo tee ${SERVICE_PATHS.SOL_SERVICE} > /dev/null`)
  console.log(chalk.white('solv.service configuration updated!'))
}
