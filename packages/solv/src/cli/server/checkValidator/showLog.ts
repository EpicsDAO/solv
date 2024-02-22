import { TailOptions, tail } from '@/cli/log/tail'
import inquirer from 'inquirer'

export const showLog = async () => {
  const logChoices = ['all', 'error']
  const { log } = await inquirer.prompt<{ log: string }>([
    {
      name: 'log',
      type: 'list',
      message: 'Select log to show:',
      choices: logChoices,
    },
  ])
  if (log === 'all') {
    const options = {
      all: true,
    } as TailOptions
    tail(options)
  } else {
    const options = {
      error: true,
    } as TailOptions
    tail(options)
  }
}
