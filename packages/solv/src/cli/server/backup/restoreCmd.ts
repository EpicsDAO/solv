import chalk from 'chalk'

export const restoreCmd = () => {
  const text = `Please stop your Solana Validator first by running the following command:
${chalk.green(`$ solv stop`)}      
  
Then, go to your local machine and run the following command:
${chalk.green(`$ solv scp upload`)}

Then come back and run the following command:
${chalk.green(`$ solv restart --snapshot`)}`
  console.log(text)
}
