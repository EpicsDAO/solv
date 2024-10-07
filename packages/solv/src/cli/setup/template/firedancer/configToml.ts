const configToml = () => {
  const filePath = '/home/solv/firedancer/config.toml'
  const body = `name = \"solv\"
user = \"solv\"
scratch_directory = \"/home/{user}\"
dynamic_port_range = \"8900-9000\"

[log]
    path = \"/home/solv/solana-validator.log\"
    colorize = \"auto\"
    level_logfile = \"INFO\"
    level_stderr = \"NOTICE\"
    level_flush = \"WARNING\"

[reporting]
    solana_metrics_config = \"host=https://metrics.solana.com:8086,db=tds,u=testnet_write,p=c4fa841aa918bf8274e3e2a44d77568d9861b3ea\"

[ledger]
    path = \"/mnt/ledger\"
    accounts_path = \"/mnt/accounts\"
    limit_size = 200_000_000
    account_indexes = []
    account_index_exclude_keys = []
    snapshot_archive_format = \"zstd\"
    require_tower = false

[rpc]
    port = 8899
    full_api = true
    private = true

[snapshots]
    incremental_snapshots = true
    full_snapshot_interval_slots = 25000
    incremental_snapshot_interval_slots = 100
    path = \"\"

[gossip]
    entrypoints = [
      \"entrypoint.testnet.solana.com:8001\",
      \"entrypoint2.testnet.solana.com:8001\",
      \"entrypoint3.testnet.solana.com:8001\",
    ]

[consensus]
    identity_path = \"/home/solv/identity.json\"
    vote_account_path = \"/home/solv/testnet-vote-account-keypair.json\"
    authorized_voter_paths = [
        \"/home/solv/testnet-validator-keypair.json\"
    ]
    snapshot_fetch = true
    genesis_fetch = true
    expected_genesis_hash = \"4uhcVJyU9pJkvQyS88uRDiswHXSCkY3zQawwpjk2NsNY\"

[layout]
   affinity = \"0-126/2\"
   net_tile_count = 1
   quic_tile_count = 1
   verify_tile_count = 27
   bank_tile_count = 27
   shred_tile_count = 1


[hugetlbfs]
    mount_path = \"/mnt\"`
  return { filePath, body }
}

export default configToml
