import inquirer from 'inquirer'

export type deactivateStakeAskOption = {
  stakeAccount: string
  authorityKeyPath: string
}

export const deactivateStakeAsk = async () => {
  const answer = await inquirer.prompt<deactivateStakeAskOption>([
    {
      type: 'input',
      name: 'stakeAccount',
      message: `What is your Stake Account Address?(e.g. xxxxxxxxxxxxxx)`,
      default() {
        return 'xxxxxxxxxxxxxxxx'
      },
    },
    {
      type: 'input',
      name: 'authorityKeyPath',
      message: `What is the Authority Account Account Address?(Enter to default)`,
      default() {
        return '~/mainnet-validator-keypair.json'
      },
    },
  ])
  return answer
}
