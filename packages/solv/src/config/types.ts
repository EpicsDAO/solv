import {
  MNT_DISK_TYPE,
  NodeType,
  Network,
  ValidatorType,
  RpcType,
} from '@/config/enums'

export type DefaultConfigType = {
  NETWORK: Network
  NODE_TYPE: NodeType
  VALIDATOR_TYPE: ValidatorType
  RPC_TYPE: RpcType
  MNT_DISK_TYPE: MNT_DISK_TYPE
  TESTNET_SOLANA_VERSION: string
  MAINNET_SOLANA_VERSION: string
  NODE_VERSION: string
  TESTNET_DELINQUENT_STAKE: number
  MAINNET_DELINQUENT_STAKE: number
  COMMISSION: number
  DEFAULT_VALIDATOR_VOTE_ACCOUNT_PUBKEY: string
  STAKE_ACCOUNTS: string[]
  HARVEST_ACCOUNT: string
  IS_MEV_MODE: boolean
  RPC_URL: string
  KEYPAIR_PATH: string
  DISCORD_WEBHOOK_URL: string
  AUTO_UPDATE: boolean
  AUTO_RESTART: boolean
  IS_DUMMY: boolean
  API_KEY: string
}
