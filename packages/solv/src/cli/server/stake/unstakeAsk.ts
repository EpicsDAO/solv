import inquirer from 'inquirer'

export type unstakeAskOption = {
  unstakeOption: string
}

export const unstakeAsk = async () => {
  const unstakeOptions = ['Deactivate Stake', 'Withdraw Stake']
  const answer = await inquirer.prompt<unstakeAskOption>([
    {
      type: 'list',
      name: 'unstakeOption',
      message: 'What would you like to do?',
      choices: unstakeOptions,
      default: unstakeOptions[0],
    },
  ])
  return answer
}
