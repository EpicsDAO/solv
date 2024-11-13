// Config File Name
export const SOLV_HOME = '/home/solv'
export const REMOTE_HOME = '~/solv'
export const SOLV_CONFIG_FILE = 'solv5.config.json'
export const STARTUP_SCRIPT_FILE = 'start-validator.sh'
export const LOG_FILE = `solana-validator.log`

// Config File Paths
export const EPOCH_TIMER_FILE_PATH = '/home/solv/currentEpoch.json'
export const SOLV_CONFIG_PATH = '/home/solv/solv5.config.json'
export const DEFAULT_LEDGER_PATH = '/mnt/ledger'
export const DEFAULT_SNAPSHOT_PATH = '/mnt/ledger/snapshot'
export const DEFAULT_ACCOUNTS_PATH = '/mnt/accounts'

// Linux System Config File Paths
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
