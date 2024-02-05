import { setupSystemd } from '@/cli/setup/setupSystemd'
import { setupLogrotate } from './setupLogrotate'
import { setupSolvService } from './setupSolvService'

export const makeServices = (isTest = true, isJitoMev = false) => {
  setupLogrotate()
  setupSolvService(isTest, isJitoMev)
  setupSystemd()
}
