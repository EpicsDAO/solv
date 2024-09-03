import installAgave from '@/cli/install/installAgave'
import { installJito } from '@/cli/install/installJito'
import { STARTUP_SCRIPT } from '@/config/constants'
import { RpcType } from '@/config/enums'
import { DefaultConfigType } from '@/config/types'
import { readOrCreateJitoConfig } from '@/lib/readOrCreateJitoConfig'
import { startJitoRPCScript } from '@/template/startupScripts/startJitoRPCScript'
import { existsAsync } from '@skeet-framework/utils'
import { writeFile } from 'fs/promises'
import updateStartupScriptPermissions from '@/cli/setup/updateStartupScriptPermission'

const setupRpcNode = async (config: DefaultConfigType) => {
  const rpcType = config.RPC_TYPE
  let startupScript = ''
  switch (rpcType) {
    case RpcType.AGAVE:
      console.log('Agave RPC Node Setup')
      installAgave(config.TESTNET_SOLANA_VERSION)
      break
    case RpcType.JITO:
      const jitoConfig = await readOrCreateJitoConfig()
      console.log('JITO RPC Node Setup')
      installJito(config.TESTNET_SOLANA_VERSION)
      startupScript = startJitoRPCScript(
        jitoConfig.commissionBps,
        jitoConfig.relayerUrl,
        jitoConfig.blockEngineUrl,
        jitoConfig.shredReceiverAddr,
      )
      break
    // case RpcType.JUPITER_GEYSER:
    //   installJito(config.TESTNET_SOLANA_VERSION)
    //   break
    default:
      console.log('Unknown RPC Node Setup')
      break
  }
  if (await existsAsync(STARTUP_SCRIPT)) {
    console.log('Startup script already exists. Skipping...')
    return
  }
  await writeFile(STARTUP_SCRIPT, startupScript, 'utf-8')
  updateStartupScriptPermissions()
}

export default setupRpcNode
