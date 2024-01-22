import { SOLV_TYPES, startupScriptPaths } from '@/config/config'
import { getStartupScript } from '@/template/getStartupScript'
import { spawnSync } from 'child_process'
import { writeFileSync } from 'fs'

export const genStartupValidatorScript = (
  fetchSnapshot = false,
  solvType = SOLV_TYPES.TESTNET_VALIDATOR,
) => {
  try {
    const isTest = solvType === SOLV_TYPES.TESTNET_VALIDATOR ? true : false
    const body = getStartupScript(fetchSnapshot)
    const { scriptPath } = startupScriptPaths(isTest)
    writeFileSync(scriptPath, body, 'utf-8')
    const cmd = `sudo chmod +x ${scriptPath}`
    spawnSync(cmd, { shell: true, stdio: 'inherit' })
  } catch (error) {
    throw new Error(`genStartupValidatorScript: ${error}`)
  }
}
