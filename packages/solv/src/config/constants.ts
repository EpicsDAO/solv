// solv config Path
export const SOLV_CONFIG_PATH = '~/solv.config.json'
export const SOLV_CONFIG_FILE = 'solv.config.json'

// Linux System Config Files
export const SOL_SERVICE = '/etc/systemd/system/solv.service'
export const SOL_LOGROTATE = '/etc/logrotate.d/solana'
export const SOL_SYSTEM_CONFIG21 = '/etc/sysctl.d/21-solana-validator.conf'
export const SOL_NOFILES_CONF = '/etc/security/limits.d/90-solana-nofiles.conf'
export const SOL_SYSTEM_CONF = '/etc/systemd/system.conf'
export const SOLANA_PATH = '/home/solv/.local/share/solana/install'

// Solana Key Names
export const IDENTITY_KEY = 'identity.json'
export const UNSTAKED_KEY = 'unstaked-identity.json'
export const RELAYER_KEY = 'relayer-keypair.json'
export const MAINNET_VALIDATOR_KEY = 'mainnet-validator-keypair.json'
export const MAINNET_VALIDATOR_VOTE_KEY = 'mainnet-vote-account-keypair.json'
export const MAINNET_VALITATOR_AUTHORITY_KEY = 'mainnet-authority-keypair.json'
export const TESTNET_VALIDATOR_KEY = 'testnet-validator-keypair.json'
export const TESTNET_VALIDATOR_VOTE_KEY = 'testnet-vote-account-keypair.json'
export const TESTNET_VALITATOR_AUTHORITY_KEY = 'testnet-authority-keypair.json'

// Validayor Key Paths
export const SOLV_HOME = '/home/solv'
export const IDENTITY_KEY_PATH = `${SOLV_HOME}/${IDENTITY_KEY}`
export const UNSTAKED_KEY_PATH = `${SOLV_HOME}/${UNSTAKED_KEY}`
export const MAINNET_VALIDATOR_KEY_PATH = `${SOLV_HOME}/${MAINNET_VALIDATOR_KEY}`
export const MAINNET_VALIDATOR_VOTE_KEY_PATH = `${SOLV_HOME}/${MAINNET_VALIDATOR_VOTE_KEY}`
export const MAINNET_VALITATOR_AUTHORITY_KEY_PATH = `${SOLV_HOME}/${MAINNET_VALITATOR_AUTHORITY_KEY}`
export const TESTNET_VALIDATOR_KEY_PATH = `${SOLV_HOME}/${TESTNET_VALIDATOR_KEY}`
export const TESTNET_VALIDATOR_VOTE_KEY_PATH = `${SOLV_HOME}/${TESTNET_VALIDATOR_VOTE_KEY}`
export const TESTNET_VALITATOR_AUTHORITY_KEY_PATH = `${SOLV_HOME}/${TESTNET_VALITATOR_AUTHORITY_KEY}`

// Log Path
export const LOG_PATH = `${SOLV_HOME}/solana-validator.log`

// Startup Script Path
export const STARTUP_SCRIPT = SOLV_HOME + '/start-validator.sh'

// Ledger and Account Paths
export const LEDGER_PATH = '/mnt/ledger'
export const ACCOUNTS_PATH = '/mnt/accounts'

// SOLANA VALIDATOR CLI
export const SOLANA_VALIDATOR = 'solana-validator'
export const AGAVE_VALIDATOR = 'agave-validator'

// VS Upload Endpoint
export const VS_UPLOAD_ENDPOINT =
  'https://verify.validators.solutions/solv-migrate'

export const DEFAULT_VALIDATOR_VOTE_ACCOUNT_PUBKEY =
  'ELLB9W7ZCwRCV3FzWcCWoyKP6NjZJKArLyGtkqefnHcG'

export const EPOCH_TIMER_FILE_PATH = '/home/solv/currentEpoch.json'
export const MINIMUM_VALIDATOR_BALANCE = 0.5
export const SOLANA_TESTNET_RPC_URL = 'https://api.testnet.solana.com'
export const SOLANA_MAINNET_RPC_URL = 'https://api.mainnet-beta.solana.com'

export enum SWAP_TOKEN {
  SOL = 'SOL',
  USDC = 'USDC',
  elSOL = 'elSOL',
  JitoSOL = 'JitoSOL',
  mSOL = 'mSOL',
  bSOL = 'bSOL',
  EPCT = 'EPCT',
  JUP = 'JUP',
  BONK = 'BONK',
  JTO = 'JTO',
}

export const SWAP_TOKENS = Object.values(SWAP_TOKEN)

// SPL Token Mint
export const SOL_TOKEN_MINT = 'So11111111111111111111111111111111111111112'
export const USDC_TOKEN_MINT = 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'
export const ELSOL_TOKEN_MINT = 'ELSoL1owwMWQ9foMsutweCsMKbTPVBD9pFqxQGidTaMC'
export const EPCT_TOKEN_MINT = 'CvB1ztJvpYQPvdPBePtRzjL4aQidjydtUz61NWgcgQtP'
