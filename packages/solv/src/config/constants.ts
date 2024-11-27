// WEBSITE URL
export const WEB_VALIDATORS_DAO = 'https://dao.validators.solutions'
export const WEB_VALIDATORS_SOLUTIONS = 'https://validators.solutions'

// solv config Path
export const SOLV_CONFIG_PATH = '~/solv.config.json'
export const SOLV_CONFIG_FILE = 'solv.config.json'
export const SOLV4_CONFIG_FILE = 'solv4.config.json'

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

// Ledger, Account, Snapshots Paths
export const LEDGER_PATH = '/mnt/ledger'
export const ACCOUNTS_PATH = '/mnt/accounts'
export const SNAPSHOTS_PATH = `${LEDGER_PATH}`

// SOLANA VALIDATOR CLI
export const SOLANA_VALIDATOR = 'solana-validator'
export const AGAVE_VALIDATOR = 'agave-validator'

export const DEFAULT_VALIDATOR_VOTE_ACCOUNT_PUBKEY =
  'ELLB9W7ZCwRCV3FzWcCWoyKP6NjZJKArLyGtkqefnHcG'

export const EPOCH_TIMER_FILE_PATH = '/home/solv/currentEpoch.json'
export const MINIMUM_VALIDATOR_BALANCE = 0.5
export const MAX_RETRIES = 3

// Endpoint
export const SOLANA_TESTNET_RPC_URL = 'https://api.testnet.solana.com'
export const SOLANA_MAINNET_RPC_URL = 'https://api.mainnet-beta.solana.com'
export const VS_UPLOAD_ENDPOINT =
  'https://verify.validators.solutions/solv-migrate'
export const JUPITER_ENDPOINT = 'https://jup.validators.solutions/v1/jup'

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
export const SOLV_SWAP = 'SOLV420'

export const AssociationAccount = {
  So11111111111111111111111111111111111111112:
    '4Vwkpk3DTVrTGnUQTazsgQ1wxtU9QwZTmAXDaQRHg9Ra',
  EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v:
    'J8sqx9ZEoPRqboFAXK3c1R38zm41tRNJgUn2FzyeYQDj',
  J1toso1uCk3RLmjorhTtrVwY9HJ7X8V9yYac6Y7kGCPn:
    'HPj87TFMPZfm5nk1HmTH9a382RXn7h9oWftiFr3Xs12a',
  mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So:
    '8CX5tE9KvJ59HcoXwWf6tCZoRuz2JFSmunnbKC1ryaK9',
  bSo13r4TkiE4KumL71LsHTPpL2euBYLFx6h9HP3piy1:
    '782MdvLby3VfvKdfDYn9tX3DfNAtg7TcytNNFuepcoMH',
  CvB1ztJvpYQPvdPBePtRzjL4aQidjydtUz61NWgcgQtP:
    'BhR2L6J5q3xF1TxReXyHjaUh4MF6qV99tMsipzPAKeB',
  JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN:
    '212yg3Ev7khq4p1mESFGenF4nWefmkbC8f7mHM68j4vg',
  DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263:
    '61Ndjv9392jPRVGALdYgjjxGYa6TT6Gn2WLDSsmugE6U',
  jtojtomepa8beP8AuQc6eXt5FriJwfFMwQx2v2f9mCL:
    '2c9qVh8RQ6j2E2VdAEcCrRXMrd6g1vvPNZvAR6sbaGWo',
}
