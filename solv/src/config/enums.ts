export enum Network {
  MAINNET = 'mainnet-beta',
  // DEVNET = 'devnet',
  TESTNET = 'testnet',
}

export const NETWORK_TYPES = Object.values(Network)

export enum SolvType {
  RPC = 'rpc',
  VALIDATOR = 'validator',
  REMOTE = 'remote',
}

export const SOLV_TYPES = Object.values(SolvType)

export enum ValidatorType {
  AGAVE = 'agave',
  JITO = 'jito',
  FRANKENDANCER = 'frankendancer',
  NONE = 'none',
}

export const SOLANA_CLIENTS = Object.values(ValidatorType).filter(
  (type) => type !== ValidatorType.NONE,
)

export enum SolanaClient {
  AGAVE = 'agave',
  JITO = 'jito',
}

export enum RpcType {
  GEYSER_YELLOWSTONE = 'geyser-yellowstone',
  GEYSER_PSQL = 'geyser-psql',
  DAS_API = 'das-api',
  MINIMAL = 'minimal',
  NONE = 'none',
}

export const RPC_MODE = Object.values(RpcType).filter(
  (type) => type !== RpcType.NONE,
)
