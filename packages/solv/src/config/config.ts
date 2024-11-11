import { LANGS } from './langs'

export enum DISK_TYPES {
  DOUBLE,
  SINGLE,
}

export enum MOUNT_TYPES {
  SINGLE = 'single',
  DOUBLE = 'double',
}

export enum NETWORK_TYPES {
  MAINNET = 'mainnet-beta',
  TESTNET = 'testnet',
}

export enum NODE_TYPES {
  VALIDATOR = 'validator',
  RPC = 'rpc',
}

export enum SOLANA_CLIENTS {
  SOLANA = 'solana',
  JITO = 'jito',
  AGAVE = 'agave',
  FIREDANCER = 'firedancer',
}

export enum JITO_TYPES {
  CO_HOST_RELAYER = 'co-host-relayer',
  SEPARATED_RELAYER = 'separated-relayer',
  WITHOUT_RELAYER = 'without-relayer',
}

export enum FIREDANCER_TYPES {
  FIREDANCER = 'firedancer',
  FRANKENDANCER = 'frankendancer',
}

export enum SOLV_TYPES {
  TESTNET_VALIDATOR,
  MAINNET_VALIDATOR,
  RPC_NODE,
}

export const RPC_MODE = ['SOLANA_RPC', 'JITO_RPC']

export enum MAINNET_TYPES {
  SOLANA_CLIENT = 'SolanaClient',
  JITO_MEV = 'JitoMev',
  FIREDANCER = 'Firedancer',
}

// ⚠️ Please DO NOT forget to turn this to false if restart is not needed
export const NODE_RESTART_REQUIRED_MAINNET = false
export const NODE_RESTART_REQUIRED_TESTNET = false

export type CONFIG_TYPE = {
  ID: string
  LANG: LANGS
  USERNAME: string
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
  STAKE_ACCOUNT: string[]
  HARVEST_ACCOUNT: string
  IS_MEV_MODE: boolean
  RPC_URL: string
  KEYPAIR_PATH: string
  DISCORD_WEBHOOK_URL: string
  AUTO_UPDATE: boolean
  AUTO_RESTART: boolean
}

export type PartialConfigType = Partial<CONFIG_TYPE>

export const CONFIG: CONFIG_TYPE = {
  ID: 'solv',
  LANG: LANGS.EN,
  USERNAME: 'solv',
  TESTNET_SOLANA_VERSION: '2.0.8',
  MAINNET_SOLANA_VERSION: '1.18.23',
  NODE_VERSION: '20.17.0',
  TESTNET_DELINQUENT_STAKE: 5,
  MAINNET_DELINQUENT_STAKE: 5,
  COMMISSION: 5,
  SOLANA_NETWORK: NETWORK_TYPES.TESTNET,
  SOLV_TYPE: SOLV_TYPES.TESTNET_VALIDATOR,
  DISK_TYPES: DISK_TYPES.SINGLE,
  IS_SETUP: false,
  LANG_SETUP: false,
  DEFAULT_VALIDATOR_VOTE_ACCOUNT_PUBKEY:
    'ELLB9W7ZCwRCV3FzWcCWoyKP6NjZJKArLyGtkqefnHcG',
  IS_CLIENT: false,
  VALIDATOR_IPS: [],
  MAINNET_TYPE: MAINNET_TYPES.SOLANA_CLIENT,
  LEDGER_PATH: '/mnt/ledger',
  STAKE_ACCOUNT: [],
  HARVEST_ACCOUNT: '',
  IS_MEV_MODE: false,
  RPC_URL: 'https://mainnet-beta.solana.com',
  KEYPAIR_PATH: '/home/solv/testnet-validator-keypair.json',
  DISCORD_WEBHOOK_URL: '',
  AUTO_UPDATE: false,
  AUTO_RESTART: false,
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
export const SOLV_STAKE_POOL_ADDRESS =
  'So1vW4Bm6ZURzJJHZy1JpsjoVY68z4cDgF4tTLwYMa5'
export const SOLV_ELSOL_ACCOUNT_ADDRESS =
  '7tAfLKgRVd9eywSQPuMbVNd51KGkaveZQuTjapL74Fwv'
export const SOLV_POOL_MANAGER_ADDRESS =
  'EiwSTx1Z2uJATDut682U7xzzquFR4UpQJUij3wSxVoSV'
export const ELSOL_DECIMALS = 9

// Token Mint Addresses
export const ELSOL_MINT_ADDRESS = 'ELSoL1owwMWQ9foMsutweCsMKbTPVBD9pFqxQGidTaMC'
export const SOL_MINT_ADDRESS = 'So11111111111111111111111111111111111111112'
export const USDC_MINT_ADDRESS = 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'
export const EPCT_MINT_ADDRESS = 'CvB1ztJvpYQPvdPBePtRzjL4aQidjydtUz61NWgcgQtP'

export enum TOKEN_MINT_ADDRESS {
  ELSOL = ELSOL_MINT_ADDRESS,
  SOL = SOL_MINT_ADDRESS,
  USDC = USDC_MINT_ADDRESS,
  EPCT = EPCT_MINT_ADDRESS,
}

export enum JUP_URL {
  V6_BASE_URL = 'https://quote-api.jup.ag/v6',
  V6_QUOTE_URL = V6_BASE_URL + '/quote',
  V6_SWAP_URL = V6_BASE_URL + '/swap',
}

export const DECIMALS = {
  [SOL_MINT_ADDRESS]: 9,
  [ELSOL_MINT_ADDRESS]: 9,
  [USDC_MINT_ADDRESS]: 6,
  [EPCT_MINT_ADDRESS]: 6,
}

export const EPOCH_TIMER_FILE_PATH = '/home/solv/currentEpoch.json'
export const MINIMUM_VALIDATOR_BALANCE = 0.5
export const SOLANA_TESTNET_RPC_URL = 'https://api.testnet.solana.com'
