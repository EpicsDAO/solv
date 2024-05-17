import { setupSystemd } from '@/cli/setup/setupSystemd'
import { setupLogrotate } from './setupLogrotate'
import { setupSolvService } from './setupSolvService'
import { setupRelayerService } from './setupRelayerService'

export const makeServices = (
  isTest = true,
  hasRelayer = false,
  blockEngineUrl = '',
) => {
  setupLogrotate()
  setupSolvService(isTest)
  setupSystemd()
  if (hasRelayer) setupRelayerService(blockEngineUrl)
}
