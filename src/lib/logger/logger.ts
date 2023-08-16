import chalk from 'chalk'
import { Spinner } from 'cli-spinner'

export module Logger {
  export const successHex = chalk.hex('#39A845')
  export const warningHex = chalk.hex('#FFD02E')
  export const errorHex = chalk.hex('#B5332E')
  export const syncHex = chalk.hex('#3073B7')
  export const greyHex = chalk.hex('#BEBDBD')
  export const indigoHex = chalk.hex('#3950A0')
  export const pinkHex = chalk.hex('#D8A1C4')

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

  export const solvAA = () => {
    const row1 = Logger.syncHex('           _       ')
    const row2 = Logger.syncHex('          | |      ')
    const row3 = Logger.syncHex(' ___  ___ | |') + Logger.errorHex('_    __ ')
    const row4 = Logger.syncHex('/ __|/ _ \\| |') + Logger.errorHex('\\ \\ / /')
    const row5 = Logger.syncHex('\\__ \\ (_) | |') + Logger.errorHex(' \\ V / ')
    const row6 = Logger.syncHex('|___/\\___/|_|') + Logger.errorHex('  \\_/  ')

    console.log(`\n${row1}`)
    console.log(`${row2}`)
    console.log(`${row3}`)
    console.log(`${row4}`)
    console.log(`${row5}`)
    console.log(`${row6}\n`)
  }

  export const installMessage = () => {
    const msg = warningHex(`🔥 Welcome to Solana Validator Tool Solv 🔥`)
    const msg2 = `
Solv is born and ready for running Solana Validator 🚀

$ source ~/.profile
$ solv i
$ solv setup
$ solv check
$ solv start

$ solv --help for more information
`
    console.log(msg)
    console.log(greyHex(msg2))
  }

  export const mtCommandsLog = () => {
    const msg = warningHex(`🔨 Mount Commands 🔨`)
    const msg2 = `mount\n$ solv mt -p <fileSystem>\n`
    const msg3 = `unmount\n$ solv umt -p <fileSystem>\n`
    const msg4 = `mount reload\n$ solv mtr\n`
    console.log(msg)
    console.log(greyHex(msg2))
    console.log(greyHex(msg3))
    console.log(greyHex(msg4))
  }
}
