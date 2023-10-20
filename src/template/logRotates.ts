import { LOG_PATH, USERNAME } from '@/config'

export const logRotates = (username = USERNAME) => {
  const body = `${LOG_PATH} {
  su ${username} ${username} 
  daily
  rotate 3
  missingok
  postrotate
    systemctl kill -s USR1 solv.service
  endscript
}
`
  return body
}
