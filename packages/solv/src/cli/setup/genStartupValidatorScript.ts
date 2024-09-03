import { SOLV_TYPES } from '@/config/config'
import { STARTUP_SCRIPT } from '@/config/constants'
import { getStartupScript } from '@/template/getStartupScript'
import { spawnSync } from 'node:child_process'
import { writeFile } from 'fs/promises'

export const genStartupValidatorScript = async (
  fetchSnapshot = false,
  solvType = SOLV_TYPES.TESTNET_VALIDATOR,
  isJitoMev = false,
  isJitoRPC = false,
) => {
  try {
    const body = await getStartupScript(
      fetchSnapshot,
      solvType,
      isJitoMev,
      isJitoRPC,
    )
    await writeFile(STARTUP_SCRIPT, body, 'utf-8')
    const cmd = `sudo chmod +x ${STARTUP_SCRIPT}`
    spawnSync(cmd, { shell: true, stdio: 'inherit' })
  } catch (error) {
    throw new Error(`genStartupValidatorScript: ${error}`)
  }
}
