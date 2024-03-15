import { CONFIG, startupScriptPaths } from '@/config/config'

export const logRotates = (username = CONFIG.USERNAME) => {
  const { log } = startupScriptPaths()
  const body = `${log} {
  su ${username} ${username} 
  daily
  rotate 1
  size 4G
  missingok
  compress
  postrotate
    systemctl kill -s USR1 solv.service
  endscript
}
`
  return body
}
