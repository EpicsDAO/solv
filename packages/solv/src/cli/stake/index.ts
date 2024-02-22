import { program } from '@/index'
import { delegateStake } from './delegateStake'
export * from './delegateStake'
import { ConfigParams } from '@/lib/readOrCreateDefaultConfig'
import { stakeAccountQuestion } from './stakeAccountQuestion'
import { deactivateStake } from './deactivateStake'
import { withdrawStake } from './withdrawStake'
import { delegateStakeAsk } from '../server/stake/delegateStakeAsk'
import { deactivateStakeAsk } from '../server/stake/deactivateStakeAsk'
import { unstakeAsk } from '../server/stake/unstakeAsk'
import { withdrawStakeAsk } from '../server/stake/withdrawStakeAsk'

export const stakeCommands = (solvConfig: ConfigParams) => {
  const { cmds } = solvConfig.locale
  program
    .command('stake')
    .description(cmds.stake)
    .action(async () => {
      await stakeAccountQuestion(solvConfig)
      const { validatorVoteAccount, stakeAccount, authorityKeyPath } =
        await delegateStakeAsk(solvConfig)
      await delegateStake(stakeAccount, validatorVoteAccount, authorityKeyPath)
    })

  program
    .command('unstake')
    .description(cmds.stake)
    .action(async () => {
      const { unstakeOption } = await unstakeAsk()
      if (unstakeOption === 'Deactivate Stake') {
        const { stakeAccount, authorityKeyPath } = await deactivateStakeAsk()
        await deactivateStake(stakeAccount, authorityKeyPath)
      } else {
        const answer = await withdrawStakeAsk()
        await withdrawStake(
          answer.stakeAccount,
          answer.destinationAddress,
          answer.solAmount,
        )
      }
    })
}
