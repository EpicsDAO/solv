import { SOLV_TYPES, startupScriptPaths } from '@/config/config'
import { getStartupScript } from '@/template/getStartupScript'
import { spawnSync } from 'child_process'
import { writeFileSync } from 'fs'

export const genStartupValidatorScript = async (
  fetchSnapshot = false,
  solvType = SOLV_TYPES.TESTNET_VALIDATOR,
  isJitoMev = false,
  hasRelayer = false,
  isJitoRPC = false,
) => {
  try {
    const isTest = solvType === SOLV_TYPES.TESTNET_VALIDATOR ? true : false
    const body = await getStartupScript(
      fetchSnapshot,
      solvType,
      isJitoMev,
      hasRelayer,
      isJitoRPC,
    )
    const { scriptPath } = startupScriptPaths(isTest)
    writeFileSync(scriptPath, body, 'utf-8')
    const cmd = `sudo chmod +x ${scriptPath}`
    spawnSync(cmd, { shell: true, stdio: 'inherit' })
  } catch (error) {
    throw new Error(`genStartupValidatorScript: ${error}`)
  }
}
