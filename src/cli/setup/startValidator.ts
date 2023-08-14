import { USER, VALIDATOR_STARTUP_SCRIPT } from '@/index'
import { solService } from '@/template/solService'
import { writeFileSync } from 'fs'

export const startValidator = () => {
  try {
    const body = solService(USER)
    writeFileSync(`${VALIDATOR_STARTUP_SCRIPT}`, body, 'utf-8')
  } catch (error) {
    throw new Error(`startValidator Error: ${error}`)
  }
}
