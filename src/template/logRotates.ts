export const logRotates = async (username: string) => {
  const body = `/mt/solana/solana-validatorlog/solana-validator.log {
  su kaien kaien
  daily
  rotate 3
  missingok
  postrotate
    systemctl kill -s USR1 sol.service
  endscript
}
`
  return body
}
