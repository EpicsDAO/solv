import { setupSystemd } from '@/cli/setup/setupSystemd'
import { setupLogrotate } from './setupLogrotate'
import { setupSolvService } from './setupSolvService'

export const makeServices = () => {
  setupLogrotate()
  setupSolvService()
  setupSystemd()
}
