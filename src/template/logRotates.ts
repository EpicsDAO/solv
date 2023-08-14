export const logRotates = async (username: string) => {
  const body = `/mt/solana/solana-validator/log/solana-validator.log {
  su solv solv
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
