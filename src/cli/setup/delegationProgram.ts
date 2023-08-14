export const delegationProgram = () => {
  const cmds = [
    'sudo apt install libudev-dev build-essential',
    'cargo install solana-foundation-delegation-program-cli',
    'solana-foundation-delegation-program --version',
    `solana-foundation-delegation-program apply --mainnet mainnet-validator-keypair.json --testnet testnet-validator-keypair.json`,
  ]
}
