export const relayerService = (blockEngineUrl: string) => {
  const filePath = '/etc/systemd/system/relayer.service'
  const body = `# Example Systemd File for Co-Hosted Relayer
[Unit]
Description=Solana transaction relayer
Requires=network-online.target
After=network-online.target

# User is required to install a keypair here that's used to auth against the block engine
ConditionPathExists=/home/solv/relayer-keypair.json
ConditionPathExists=/home/solv/private.pem
ConditionPathExists=/home/solv/public.pem

[Service]
Type=exec
User=solv
Restart=on-failure
Environment=RUST_LOG=info
Environment=SOLANA_METRICS_CONFIG="host=http://metrics.jito.wtf:8086,db=relayer,u=relayer-operators,p=jito-relayer-write"
Environment=BLOCK_ENGINE_URL=${blockEngineUrl}
Environment=GRPC_BIND_IP=127.0.0.1

ExecStart=/home/solv/jito-relayer/target/release/jito-transaction-relayer \\
          --keypair-path=/home/solv/relayer-keypair.json \\
          --signing-key-pem-path=/home/solv/private.pem \\
          --verifying-key-pem-path=/home/solv/public.pem

[Install]
WantedBy=multi-user.target`
  return { filePath, body }
}

export const jitoRelayerSeparateService = (blockEngineUrl: string) => {
  const filePath = '/etc/systemd/system/relayer.service'
  const body = `[Unit]
Description=Solana transaction relayer
Requires=network-online.target
After=network-online.target

# User is required to install a keypair here that's used to auth against the block engine
ConditionPathExists=/home/solv/relayer-keypair.json
ConditionPathExists=/home/solv/private.pem
ConditionPathExists=/home/solv/public.pem

[Service]
Type=exec
User=solv
Restart=on-failure
Environment=RUST_LOG=info
Environment=SOLANA_METRICS_CONFIG="host=http://metrics.jito.wtf:8086,db=relayer,u=relayer-operators,p=jito-relayer-write"
Environment=BLOCK_ENGINE_URL=${blockEngineUrl}
Environment=RPC_SERVERS=https://your.rpc.server
Environment=WEBSOCKET_SERVERS=wss://your.websocket.server

ExecStart=/home/solv/jito-relayer/target/release/jito-transaction-relayer \
          --keypair-path=/home/solv/relayer-keypair.json \
          --signing-key-pem-path=/home/solv/private.pem \
          --verifying-key-pem-path=/home/solv/public.pem \
          --forward-all

[Install]
WantedBy=multi-user.target`
  return { filePath, body }
}
