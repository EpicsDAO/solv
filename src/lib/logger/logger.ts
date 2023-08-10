import chalk from 'chalk'
import { Spinner } from 'cli-spinner'

export module Logger {
  export const normal = (text: string) => {
    console.log(chalk.white(text))
  }

  export const syncSpinner = (text: string) => {
    const spinner = new Spinner(chalk.white(text) + ` %s\n`)
    try {
      spinner.setSpinnerString(18)
      spinner.start()
      return spinner
    } catch (error) {
      spinner.stop(true)
      throw new Error(`syncSpinner Error: ${error}`)
    }
  }
}
