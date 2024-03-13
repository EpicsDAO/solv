import { LANGS } from './langs'

export enum DISK_TYPES {
  DOUBLE,
  SINGLE,
}

export enum NETWORK_TYPES {
  MAINNET = 'mainnet-beta',
  TESTNET = 'testnet',
}

export enum SOLV_TYPES {
  TESTNET_VALIDATOR,
  MAINNET_VALIDATOR,
  RPC_NODE,
}

export enum MAINNET_TYPES {
  SOLANA_CLIENT = 'SolanaClient',
  JITO_MEV = 'JitoMev',
  FIREDANCER = 'Firedancer',
}

export type CONFIG_TYPE = {
  LANG: LANGS
  USERNAME: string
  SOLANA_VERSION: string
  TESTNET_SOLANA_VERSION: string
  MAINNET_SOLANA_VERSION: string
  NODE_VERSION: string
  TESTNET_DELINQUENT_STAKE: number
  MAINNET_DELINQUENT_STAKE: number
  COMMISSION: number
  SOLANA_NETWORK: NETWORK_TYPES
  SOLV_TYPE: SOLV_TYPES
  DISK_TYPES: DISK_TYPES
  IS_SETUP: boolean
  LANG_SETUP: boolean
  DEFAULT_VALIDATOR_VOTE_ACCOUNT_PUBKEY: string
  IS_CLIENT: boolean
  VALIDATOR_IPS: string[]
  MAINNET_TYPE: MAINNET_TYPES
  LEDGER_PATH: string
}

export type PartialConfigType = Partial<CONFIG_TYPE>

export const CONFIG: CONFIG_TYPE = {
  LANG: LANGS.EN,
  USERNAME: 'solv',
  SOLANA_VERSION: '1.18.4',
  TESTNET_SOLANA_VERSION: '1.18.5',
  MAINNET_SOLANA_VERSION: '1.17.25',
  NODE_VERSION: '20.10.0',
  TESTNET_DELINQUENT_STAKE: 8,
  MAINNET_DELINQUENT_STAKE: 5,
  COMMISSION: 7,
  SOLANA_NETWORK: NETWORK_TYPES.TESTNET,
  SOLV_TYPE: SOLV_TYPES.TESTNET_VALIDATOR,
  DISK_TYPES: DISK_TYPES.SINGLE,
  IS_SETUP: false,
  LANG_SETUP: false,
  DEFAULT_VALIDATOR_VOTE_ACCOUNT_PUBKEY:
    '76DafWkJ6pGK2hoD41HjrM4xTBhfKqrDYDazv13n5ir1',
  IS_CLIENT: false,
  VALIDATOR_IPS: [],
  MAINNET_TYPE: MAINNET_TYPES.SOLANA_CLIENT,
  LEDGER_PATH: '/mnt/ledger',
}

export const HOME_PATHS = {
  ROOT: '/home/solv',
  AUTHORIZED_KEYS: '/home/solv/.ssh/authorized_keys',
}

export const MT_PATHS = {
  ROOT: '/mnt',
  ACCOUNTS: '/mnt/accounts',
  LEDGER: '/mnt/ledger',
}

export const FILES = {
  LOG: 'solana-validator.log',
  STARTUP_SCRIPT: 'start-validator.sh',
  CONFIG: 'solv.config.json',
  JITO_CONFIG: 'jito.config.json',
}

export const SERVICE_PATHS = {
  SOL_SERVICE: '/etc/systemd/system/solv.service',
  SOL_LOGROTATE: '/etc/logrotate.d/solana',
  SOL_SYSTEM_CONFIG21: '/etc/sysctl.d/21-solana-validator.conf',
  SOL_NOFILES_CONF: '/etc/security/limits.d/90-solana-nofiles.conf',
  SOL_SYSTEM_CONF: '/etc/systemd/system.conf',
  SOLANA_PATH: '/home/solv/.local/share/solana/install',
}

export const KEYPAIRS = {
  MAINNET_VALIDATOR_KEY: 'mainnet-validator-keypair.json',
  MAINNET_VALIDATOR_VOTE_KEY: 'mainnet-vote-account-keypair.json',
  MAINNET_VALITATOR_AUTHORITY_KEY: 'mainnet-authority-keypair.json',
  TESTNET_VALIDATOR_KEY: 'testnet-validator-keypair.json',
  TESTNET_VALIDATOR_VOTE_KEY: 'testnet-vote-account-keypair.json',
  TESTNET_VALITATOR_AUTHORITY_KEY: 'testnet-authority-keypair.json',
}

export const getAllKeyPaths = (path = HOME_PATHS.ROOT) => {
  const rootDir = path === HOME_PATHS.ROOT ? HOME_PATHS.ROOT : path
  const mainnetValidatorKey = `${rootDir}/${KEYPAIRS.MAINNET_VALIDATOR_KEY}`
  const mainnetValidatorVoteKey = `${rootDir}/${KEYPAIRS.MAINNET_VALIDATOR_VOTE_KEY}`
  const mainnetValidatorAuthorityKey = `${rootDir}/${KEYPAIRS.MAINNET_VALITATOR_AUTHORITY_KEY}`
  const testnetValidatorKey = `${rootDir}/${KEYPAIRS.TESTNET_VALIDATOR_KEY}`
  const testnetValidatorVoteKey = `${rootDir}/${KEYPAIRS.TESTNET_VALIDATOR_VOTE_KEY}`
  const testnetValidatorAuthorityKey = `${rootDir}/${KEYPAIRS.TESTNET_VALITATOR_AUTHORITY_KEY}`
  return {
    mainnetValidatorKey,
    mainnetValidatorVoteKey,
    mainnetValidatorAuthorityKey,
    testnetValidatorKey,
    testnetValidatorVoteKey,
    testnetValidatorAuthorityKey,
  }
}

export const startupScriptPaths = (isTest = true) => {
  const identity = isTest
    ? `${HOME_PATHS.ROOT}/${KEYPAIRS.TESTNET_VALIDATOR_KEY}`
    : `${HOME_PATHS.ROOT}/${KEYPAIRS.MAINNET_VALIDATOR_KEY}`
  const voteAccount = isTest
    ? `${HOME_PATHS.ROOT}/${KEYPAIRS.TESTNET_VALIDATOR_VOTE_KEY}`
    : `${HOME_PATHS.ROOT}/${KEYPAIRS.MAINNET_VALIDATOR_VOTE_KEY}`
  const log = `${HOME_PATHS.ROOT}/${FILES.LOG}`
  const accounts = MT_PATHS.ACCOUNTS
  const ledger = MT_PATHS.LEDGER
  const scriptPath = `${HOME_PATHS.ROOT}/${FILES.STARTUP_SCRIPT}`
  return {
    identity,
    voteAccount,
    log,
    accounts,
    ledger,
    scriptPath,
  }
}

export const SOLV_DISCORD_INVITE = 'https://discord.gg/y8tCMzPU9Y'
export const DEFAULT_VALIDATOR_VOTE_ACCOUNT_PUBKEY =
  '76DafWkJ6pGK2hoD41HjrM4xTBhfKqrDYDazv13n5ir1'
