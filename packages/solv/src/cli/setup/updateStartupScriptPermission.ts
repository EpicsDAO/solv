import { STARTUP_SCRIPT } from '@/config/constants'
import { spawnSync } from 'node:child_process'

const updateStartupScriptPermission = () => {
  const cmd = `sudo chmod +x ${STARTUP_SCRIPT}`
  spawnSync(cmd, { shell: true, stdio: 'inherit' })
}

export default updateStartupScriptPermission
