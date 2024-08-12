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
