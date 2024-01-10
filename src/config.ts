export const DEFAULT_LANG = 'en'
export const DEFAULT_SOLANA_VERSION = '1.17.15'
export const DEFAULT_NODE_VERSION = '20.10.0'
export const DEFAULT_DELINQUENT_STAKE = 5
export const DEFAULT_COMMISSION = 10
export const DEFAULT_SOLANA_NETWORK = 'testnet'
export const DEFAULT_SSH_PUBKEY_PATH = '~/.ssh/id_rsa.pub'
export const USERNAME = 'solv'

export const MOUNT_ROOT = '/mt'
export const SOLV_ROOT = `${MOUNT_ROOT}/solana`
export const WD = `${SOLV_ROOT}/solana-validator`
export const SOLANA_ACCOUNT_ROOT = `${MOUNT_ROOT}/solana-accounts`
export const SWAP_PATH = `${MOUNT_ROOT}/swapfile`
export const LEDGER_PATH = `${MOUNT_ROOT}/ledger/validator-ledger`
export const SNAPSHOT_PATH = `${LEDGER_PATH}/snapshots`
export const LOG_DIR = `${WD}/log`
export const LOG_PATH = `${WD}/log/solana-validator.log`
export const VALIDATOR_STARTUP_SCRIPT = `${WD}/start-validator.sh`

export const DEFAULT_FILE_SYSTEM = '/dev/vda'

export const MAINNET_VALIDATOR_KEY_NAME = 'mainnet-validator-keypair.json'
export const TESTNET_VALIDATOR_KEY_NAME = 'testnet-validator-keypair.json'
export const VALIDATOR_VOTE_KEY_NAME = 'vote-account-keypair.json'
export const VALITATOR_AUTHORITY_KEY_NAME = 'authority-keypair.json'

export const validatorKeyNames = [
  MAINNET_VALIDATOR_KEY_NAME,
  TESTNET_VALIDATOR_KEY_NAME,
  VALIDATOR_VOTE_KEY_NAME,
  VALITATOR_AUTHORITY_KEY_NAME,
]

export const MAINNET_VALIDATOR_KEYFILE = `${SOLV_ROOT}/${MAINNET_VALIDATOR_KEY_NAME}`
export const TESTNET_VALIDATOR_KEYFILE = `${SOLV_ROOT}/${TESTNET_VALIDATOR_KEY_NAME}`
export const VALIDATOR_VOTE_KEYFILE = `${SOLV_ROOT}/${VALIDATOR_VOTE_KEY_NAME}`
export const VALITATOR_AUTHORITY_KEYFILE = `${SOLV_ROOT}/${VALITATOR_AUTHORITY_KEY_NAME}`

export const validatorKeys = [
  TESTNET_VALIDATOR_KEYFILE,
  MAINNET_VALIDATOR_KEYFILE,
  VALIDATOR_VOTE_KEYFILE,
  VALITATOR_AUTHORITY_KEYFILE,
]

export const SOLV_KEYPAIR_DOWNLOAD_PATH = `~/solvKeys/download`
export const SOLV_KEYPAIR_UPLOAD_PATH = `~/solvKeys/upload`
export const SOLV_KEYPAIR_TRASH_PATH = `~/solvKeys/trash`

export const validatorLocalKeys = [
  `${SOLV_KEYPAIR_UPLOAD_PATH}/${TESTNET_VALIDATOR_KEY_NAME}`,
  `${SOLV_KEYPAIR_UPLOAD_PATH}/${MAINNET_VALIDATOR_KEY_NAME}`,
  `${SOLV_KEYPAIR_UPLOAD_PATH}/${VALIDATOR_VOTE_KEY_NAME}`,
  `${SOLV_KEYPAIR_UPLOAD_PATH}/${VALITATOR_AUTHORITY_KEY_NAME}`,
]

export const SOL_SERVICE_PATH = '/etc/systemd/system/solv.service'
export const SOL_LOGROTATE_PATH = '/etc/logrotate.d/solana'
export const SOL_SYSTEM_CONFIG21_PATH = '/etc/sysctl.d/21-solana-validator.conf'
export const SOL_NOFILES_CONF_PATH =
  '/etc/security/limits.d/90-solana-nofiles.conf'
export const SOL_SYSTEM_CONF = '/etc/systemd/system.conf'

export const DEFAULT_VALIDATOR_VOTE_ACCOUNT_PUBKEY =
  '76DafWkJ6pGK2hoD41HjrM4xTBhfKqrDYDazv13n5ir1'
export const DEFAULT_AUTHORITY_ACCOUNT_KEYFILE = './authority-keypair.json'

export const SSH_PUBKEY_PATH = '~/.ssh/authorized_keys'
export const SOLV_DISCORD_INVITE = 'https://discord.gg/y8tCMzPU9Y'
