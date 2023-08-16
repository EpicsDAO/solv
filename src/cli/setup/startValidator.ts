import { startValidatorSh } from '@/template/startValitatorSh'
import { SolvConfig } from '@/types/solvTypes'
import { existsSync, mkdirSync, writeFileSync } from 'fs'

export const startValidator = (fetchSnapshot = false) => {
  try {
    const body = startValidatorSh(fetchSnapshot)
    if (!existsSync(SolvConfig.WD)) {
      mkdirSync(SolvConfig.WD, { recursive: true })
    }
    writeFileSync(`${SolvConfig.VALIDATOR_STARTUP_SCRIPT}`, body, 'utf-8')
  } catch (error) {
    throw new Error(`startValidator Error: ${error}`)
  }
}
