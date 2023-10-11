export type UbuntuDhParams = {
  Filesystem: string
  Size: string
  Used: string
  Avail: string
  Use: string
  MountedOn: string
}

export type ReleaseType = 'jammy' | 'focal'

export module SolvPaths {
  export const CHANGE_LOG_PATH = './solv-debian/debian/changelog'
  export const DEFAULT_FILE_SYSTEM = '/dev/nvme1n1'
}

export module SolvConfig {
  export const MOUNT_ROOT = '/mt'
  export const RAMDRIVE_PATH = `/mnt/ramdrive`
  export const SWAP_PATH = `/mt/swapfile`
  export const SOLV_ROOT = `${MOUNT_ROOT}/solana`
  export const WD = `${SOLV_ROOT}/solana-validator`
  export const LOG_DIR = `${WD}/log`
  export const LOG_PATH = `${WD}/log/solana-validator.log`
  export const ACCOUNT_PATH = `${MOUNT_ROOT}/solana-accounts`
  export const LEDGER_PATH = `${MOUNT_ROOT}/ledger/validator-ledger`
  export const VALIDATOR_STARTUP_SCRIPT = `${WD}/start-validator.sh`

  // Solana Wallet Keyfile Paths
  export const MAINNET_VALIDATOR_KEYFILE = `${SOLV_ROOT}/mainnet-validator-keypair.json`
  export const TESTNET_VALIDATOR_KEYFILE = `${SOLV_ROOT}/testnet-validator-keypair.json`
  export const VALIDATOR_VOTE_KEYFILE = `${SOLV_ROOT}/vote-account-keypair.json`
  export const VALITATOR_AUTHORITY_KEYFILE = `${SOLV_ROOT}/authority-keypair.json`

  export const DEFAULT_VALIDATOR_VOTE_ACCOUNT_PUBKEY =
    '76DafWkJ6pGK2hoD41HjrM4xTBhfKqrDYDazv13n5ir1'
  export const DEFAULT_AUTHORITY_ACCOUNT_KEYFILE = './authority-keypair.json'
  export const DEFAULT_SOLANA_VERSION = '1.17.1'
  export const DEFAULT_DELINQUENT_STAKE = 5
  export const DEFAULT_SOLANA_NETWORK = 'testnet'

  export const SOL_SERVICE_PATH = '/etc/systemd/system/solv.service'
  export const SOL_LOGROTATE_PATH = '/etc/logrotate.d/solana'
  export const SOL_SYSTEM_CONFIG21_PATH =
    '/etc/sysctl.d/21-solana-validator.conf'
  export const SOL_NOFILES_CONF_PATH =
    '/etc/security/limits.d/90-solana-nofiles.conf'
  export const SOL_SYSTEM_CONF = '/etc/systemd/system.conf'
}
