import inquirer from 'inquirer'

export type withdrawStakeAskOption = {
  stakeAccount: string
  destinationAddress: string
  solAmount: string
}

export const withdrawStakeAsk = async () => {
  const answer = await inquirer.prompt<withdrawStakeAskOption>([
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
      name: 'destinationAddress',
      message: `What is the destination address for the withdrawn SOL?`,
      default() {
        return 'xxxxxxxx'
      },
    },
    {
      type: 'input',
      name: 'solAmount',
      message: `How many SOL would you like to withdraw?`,
      default() {
        return 1
      },
    },
  ])
  return answer
}
