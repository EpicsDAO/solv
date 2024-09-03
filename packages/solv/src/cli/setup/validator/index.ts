import installAgave from '@/cli/install/installAgave'
import { installJito } from '@/cli/install/installJito'
import installSolana from '@/cli/install/installSolana'
import { STARTUP_SCRIPT } from '@/config/constants'
import { Network, ValidatorType } from '@/config/enums'
import { DefaultConfigType } from '@/config/types'
import { readOrCreateJitoConfig } from '@/lib/readOrCreateJitoConfig'
import { startJitoValidatorScript } from '@/template/startupScripts/startJitoValidatorScript'
import { startMainnetValidatorScript } from '@/template/startupScripts/startMainnetValidatorScript'
import { startTestnetAgaveValidatorScript } from '@/template/startupScripts/startTestnetAgaveValidatorScript'
import { existsAsync } from '@skeet-framework/utils'
import { writeFile } from 'fs/promises'
import updateStartupScriptPermissions from '@/cli/setup/updateStartupScriptPermission'

const setupValidatorNode = async (config: DefaultConfigType) => {
  const { NETWORK: network } = config
  if (network === Network.MAINNET) {
    console.log('Mainnet Validator Node Setup')
    await setupMainnetValidator(config)
  } else if (network === Network.TESTNET) {
    console.log('Testnet Validator Node Setup')
    await setupTestnetValidator(config)
  } else {
    console.log('Unknown Network Validator Node Setup')
  }
}

const setupMainnetValidator = async (config: DefaultConfigType) => {
  const { VALIDATOR_TYPE: validatorType, MAINNET_SOLANA_VERSION: version } =
    config
  let startupScript = ''
  switch (validatorType) {
    case ValidatorType.SOLANA:
      installSolana(version)
      startupScript = startMainnetValidatorScript()
      break
    // case ValidatorType.AGAVE:
    //   console.log('Coming soon...🌉')
    //   break
    case ValidatorType.JITO:
      console.log('JITO Validator Setup for Mainnet')
      const jitoConfig = await readOrCreateJitoConfig()
      installJito(version)
      startupScript = startJitoValidatorScript(
        jitoConfig.commissionBps,
        jitoConfig.relayerUrl,
        jitoConfig.blockEngineUrl,
        jitoConfig.shredReceiverAddr,
      )
      break
    // case ValidatorType.FRANKENDANCER:
    //   console.log('Coming soon...🌉')
    //   break
    // case ValidatorType.FIREDANCER:
    //   console.log('Coming soon...🌉')
    //   break
    default:
      console.log('Unknown Validator Type for Mainnet')
      break
  }
  if (await existsAsync(STARTUP_SCRIPT)) {
    console.log('Startup script already exists. Skipping...')
    return
  }
  await writeFile(STARTUP_SCRIPT, startupScript, 'utf-8')
  updateStartupScriptPermissions()
}

const setupTestnetValidator = async (config: DefaultConfigType) => {
  const { VALIDATOR_TYPE: validatorType } = config
  let startupScript = ''
  switch (validatorType) {
    case ValidatorType.SOLANA:
      installSolana(config.TESTNET_SOLANA_VERSION)
      startupScript = startTestnetAgaveValidatorScript()
    case ValidatorType.AGAVE:
      console.log('Agave Validator Setup for Testnet')
      installAgave(config.TESTNET_SOLANA_VERSION)
      startupScript = startTestnetAgaveValidatorScript()
      break
    case ValidatorType.JITO:
      console.log('JITO Validator Setup for Testnet')
      const jitoConfig = await readOrCreateJitoConfig()
      installJito(config.TESTNET_SOLANA_VERSION)
      startupScript = startJitoValidatorScript(
        jitoConfig.commissionBps,
        jitoConfig.relayerUrl,
        jitoConfig.blockEngineUrl,
        jitoConfig.shredReceiverAddr,
      )
      break
    // case ValidatorType.FRANKENDANCER:
    //   console.log('Coming soon...🌉')
    //   break
    // case ValidatorType.FIREDANCER:
    //   console.log('Coming soon...🌉')
    //   break
    default:
      console.log('Unknown Validator Type for Testnet')
      break
  }
  if (await existsAsync(STARTUP_SCRIPT)) {
    console.log('Startup script already exists. Skipping...')
    return
  }
  await writeFile(STARTUP_SCRIPT, startupScript, 'utf-8')
  updateStartupScriptPermissions()
}

export default setupValidatorNode
