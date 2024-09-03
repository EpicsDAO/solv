export const yellowstoneGeyser = () => {
  const cmd = `sudo apt-get install libsasl2-dev build-essential -y
  git clone https://github.com/rpcpool/yellowstone-grpc.git
  cd yellowstone-grpc && cargo build -r
  cargo-fmt && cargo run --bin config-check -- --config yellowstone-grpc-geyser/config.json
  `
}
