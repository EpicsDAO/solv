import { SOLV_ROOT, VALIDATOR_STARTUP_SCRIPT } from '@/config'
import { startValidatorSh } from '@/template/startValitatorSh'
import { existsSync, mkdirSync, writeFileSync } from 'fs'

export const startValidator = (fetchSnapshot = false) => {
  try {
    const body = startValidatorSh(fetchSnapshot)
    if (!existsSync(SOLV_ROOT)) {
      mkdirSync(SOLV_ROOT, { recursive: true })
    }
    writeFileSync(`${VALIDATOR_STARTUP_SCRIPT}`, body, 'utf-8')
  } catch (error) {
    throw new Error(`startValidator Error: ${error}`)
  }
}
