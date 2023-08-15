import { USER, VALIDATOR_STARTUP_SCRIPT } from '@/index'
import { startValidatorSh } from '@/template/startValitatorSh'
import { writeFileSync } from 'fs'

export const startValidator = (fetchSnapshot = false) => {
  try {
    const body = startValidatorSh(fetchSnapshot)
    writeFileSync(`${VALIDATOR_STARTUP_SCRIPT}`, body, 'utf-8')
  } catch (error) {
    throw new Error(`startValidator Error: ${error}`)
  }
}
