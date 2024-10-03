export enum LANG {
  EN = 'en',
  JA = 'ja',
}

export const LANGS = Object.values(LANG)

export enum Network {
  MAINNET = 'mainnet-beta',
  // DEVNET = 'devnet',
  TESTNET = 'testnet',
}

export const NETWORK_TYPES = Object.values(Network)

export enum NodeType {
  RPC = 'rpc',
  VALIDATOR = 'validator',
}

export const NODE_TYPES = Object.values(NodeType)

export enum ValidatorType {
  SOLANA = 'solana',
  AGAVE = 'agave',
  JITO = 'jito',
  FRANKENDANCER = 'frankendancer',
  // FIREDANCER = 'firedancer',
  NONE = 'none',
}

export const SOLANA_CLIENTS = Object.values(ValidatorType).filter(
  (type) => type !== ValidatorType.NONE,
)

export enum RpcType {
  AGAVE = 'agave',
  JITO = 'jito',
  NONE = 'none',
}

export const RPC_MODE = Object.values(RpcType).filter(
  (type) => type !== RpcType.NONE,
)

export enum MNT_DISK_TYPE {
  SINGLE = 'single',
  DOUBLE = 'double',
}
