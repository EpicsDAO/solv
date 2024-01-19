import { startupScriptPaths } from '@/config/config'
import { getStartupScript } from '@/template/getStartupScript'
import { spawnSync } from 'child_process'
import { writeFileSync } from 'fs'

export const genStartupValidatorScript = (fetchSnapshot = false) => {
  try {
    const body = getStartupScript(fetchSnapshot)
    const { scriptPath } = startupScriptPaths()
    writeFileSync(scriptPath, body, 'utf-8')
    const cmd = `sudo chmod +x ${scriptPath}`
    spawnSync(cmd, { shell: true, stdio: 'inherit' })
  } catch (error) {
    throw new Error(`genStartupValidatorScript: ${error}`)
  }
}
