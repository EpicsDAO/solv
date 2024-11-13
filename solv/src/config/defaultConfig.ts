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
import {
  DEFAULT_ACCOUNTS_PATH,
  DEFAULT_LEDGER_PATH,
  DEFAULT_SNAPSHOT_PATH,
} from '@/config/constants/filePath.ts'
import { SOLV_HOME } from '@/config/constants/filePath.ts'
import { MAINNET_VALIDATOR_KEY } from '@/config/constants/filePath.ts'

export type DefaultConfigType = {
  SOLV_TYPE: SolvType
  NETWORK: Network
  VALIDATOR_TYPE: ValidatorType
  RPC_TYPE: RpcType
  SOLANA_CLIENT: SolanaClient
  SOLANA_VERSION: string
  LEDGER_PATH: string
  ACCOUNTS_PATH: string
  SNAPSHOT_PATH: string
  DELINQUENT_STAKE: number
  COMMISSION: number
  RPC_URL: string
  KEYPAIR_PATH: string
  DISCORD_WEBHOOK_URL: string
  IS_DUMMY: boolean
  AUTO_UPDATE: boolean
  AUTO_RESTART: boolean
  API_KEY: string
  HARVEST_ACCOUNT: string
}

const DEFAULT_CONFIG: DefaultConfigType = {
  SOLV_TYPE: SolvType.RPC,
  NETWORK: Network.MAINNET,
  VALIDATOR_TYPE: ValidatorType.NONE,
  RPC_TYPE: RpcType.MINIMAL,
  SOLANA_CLIENT: SolanaClient.AGAVE,
  SOLANA_VERSION: VERSION_TESTNET,
  LEDGER_PATH: DEFAULT_LEDGER_PATH,
  ACCOUNTS_PATH: DEFAULT_ACCOUNTS_PATH,
  SNAPSHOT_PATH: DEFAULT_SNAPSHOT_PATH,
  DELINQUENT_STAKE: DELINQUENT_STAKE_TESTNET,
  COMMISSION: COMMISSION_TESTNET,
  RPC_URL: SOLANA_MAINNET_RPC_URL,
  KEYPAIR_PATH: `${SOLV_HOME}/${MAINNET_VALIDATOR_KEY}`,
  DISCORD_WEBHOOK_URL: '',
  IS_DUMMY: false,
  AUTO_UPDATE: false,
  AUTO_RESTART: false,
  API_KEY: '',
  HARVEST_ACCOUNT: '',
}

export default DEFAULT_CONFIG
