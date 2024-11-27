const geyserConfig = (xToken: string) => {
  const filePath = `/home/solv/yellowstone-grpc/yellowstone-grpc-geyser/config.json`
  const defaultConfig = {
    libpath:
      '/home/solv/yellowstone-grpc/target/release/libyellowstone_grpc_geyser.so',
    log: {
      level: 'info',
    },
    grpc: {
      address: '0.0.0.0:10000',
      compression: {
        accept: ['gzip'],
        send: ['gzip'],
      },
      max_decoding_message_size: '4_194_304',
      snapshot_plugin_channel_capacity: null,
      snapshot_client_channel_capacity: '50_000_000',
      channel_capacity: '100_000',
      unary_concurrency_limit: 100,
      unary_disabled: false,
      x_token: xToken,
    },
    prometheus: {
      address: '0.0.0.0:8999',
    },
  }
  return {
    filePath,
    defaultConfig,
  }
}

export default geyserConfig
