const firedancerService = () => {
  const filePath = '/etc/systemd/system/firedancer-api.service'
  const conf = `[Unit]
Description=Firedancer Service Instance
After=network.target

[Service]
Type=simple
ExecStart=/home/solv/firedancer/build/native/gcc/bin/fdctl run --config /home/solv/firedancer/config.toml
WorkingDirectory=/home/solv/firedancer
Restart=always
User=solv
Environment=RUST_LOG=info
Environment=PATH=/home/solv/.local/share/solana/install/active_release/bin:/home/solv/.local/share/pnpm:/home/solv/.cargo/env:/home/solv/.cargo/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin:/home/solv/.local/share/pnpm/npx

[Install]
WantedBy=multi-user.target
`

  return {
    filePath,
    conf,
  }
}

export default firedancerService
