import chalk from 'chalk'

const rpcLog = () => {
  const lighting = `${chalk.yellow('⚡️⚡️⚡️')}`
  const msg = `${chalk.blueBright(`${lighting} Solana Private RPC Connection API Key ${lighting}`)}

We're excited to offer a free API key exclusively for the Validators DAO community 🎉
It's our way of supporting the community and empowering you with fast, reliable connections.

To get your free API key, simply join us through the link below:

Validators DAO: ${chalk.white('`https://discord.gg/X4BgkBHavp`')}

Unlock fast connections and elevate your experience with your very own API key 🚀
`
  console.log(chalk.cyan(msg))
}

export default rpcLog
