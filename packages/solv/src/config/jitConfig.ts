export interface JitoConfig {
  version: string
  tag: string
  commissionBps: number
  relayerUrl: string
  blockEngineUrl: string
  shredReceiverAddr: string
  hasRelayer?: boolean
}

export const JITO_CONFIG: JitoConfig = {
  version: '1.18.22',
  tag: 'v1.18.22-jito',
  commissionBps: 700,
  relayerUrl: 'http://amsterdam.mainnet.relayer.jito.wtf:8100',
  blockEngineUrl: 'https://amsterdam.mainnet.block-engine.jito.wtf',
  shredReceiverAddr: '74.118.140.240:1002',
}

export const JITO_REGIONS = {
  Amsterdam: {
    BLOCK_ENGINE_URL: 'https://amsterdam.mainnet.block-engine.jito.wtf',
    RELAYER_URL: 'http://amsterdam.mainnet.relayer.jito.wtf:8100',
    SHRED_RECEIVER_ADDR: '74.118.140.240:1002',
  },
  Frankfurt: {
    BLOCK_ENGINE_URL: 'https://frankfurt.mainnet.block-engine.jito.wtf',
    RELAYER_URL: 'http://frankfurt.mainnet.relayer.jito.wtf:8100',
    SHRED_RECEIVER_ADDR: '145.40.93.84:1002',
  },
  NewYork: {
    BLOCK_ENGINE_URL: 'https://ny.mainnet.block-engine.jito.wtf',
    RELAYER_URL: 'http://ny.mainnet.relayer.jito.wtf:8100',
    SHRED_RECEIVER_ADDR: '141.98.216.96:1002',
  },
  Tokyo: {
    BLOCK_ENGINE_URL: 'https://tokyo.mainnet.block-engine.jito.wtf',
    RELAYER_URL: 'http://tokyo.mainnet.relayer.jito.wtf:8100',
    SHRED_RECEIVER_ADDR: '202.8.9.160:1002',
  },
  SaltLakeCity: {
    BLOCK_ENGINE_URL: 'https://slc.mainnet.block-engine.jito.wtf',
    RELAYER_URL: 'http://slc.mainnet.relayer.jito.wtf:8100',
    SHRED_RECEIVER_ADDR: '64.130.53.8:1002',
  },
}
