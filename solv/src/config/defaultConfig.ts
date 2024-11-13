import {
  Network,
  RpcType,
  SolanaClient,
  SolvType,
  ValidatorType,
} from '@/config/enums.ts'
import {
  COMMISSION_TESTNET,
  DELINQUENT_STAKE_TESTNET,
  VERSION_TESTNET,
} from '@/config/versionConfig.ts'
import { SOLANA_MAINNET_RPC_URL } from '@/config/constants/endpoint.ts'

export type DefaultConfigType = {
  SOLV_TYPE: SolvType
  NETWORK: Network
  VALIDATOR_TYPE: ValidatorType
  RPC_TYPE: RpcType
  SOLANA_CLIENT: SolanaClient
  SOLANA_VERSION: string
  DELINQUENT_STAKE: number
  COMMISSION: number
  HARVEST_ACCOUNT: string
  RPC_URL: string
  KEYPAIR_PATH: string
  DISCORD_WEBHOOK_URL: string
  AUTO_UPDATE: boolean
  AUTO_RESTART: boolean
  IS_DUMMY: boolean
  API_KEY: string
}

const DEFAULT_CONFIG: DefaultConfigType = {
  SOLV_TYPE: SolvType.RPC,
  NETWORK: Network.MAINNET,
  VALIDATOR_TYPE: ValidatorType.NONE,
  RPC_TYPE: RpcType.MINIMAL,
  SOLANA_CLIENT: SolanaClient.AGAVE,
  SOLANA_VERSION: VERSION_TESTNET,
  DELINQUENT_STAKE: DELINQUENT_STAKE_TESTNET,
  COMMISSION: COMMISSION_TESTNET,
  HARVEST_ACCOUNT: '',
  RPC_URL: SOLANA_MAINNET_RPC_URL,
  KEYPAIR_PATH: '',
  DISCORD_WEBHOOK_URL: '',
  AUTO_UPDATE: false,
  AUTO_RESTART: false,
  IS_DUMMY: false,
  API_KEY: '',
}

export default DEFAULT_CONFIG
