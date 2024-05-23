import chalk from 'chalk'
import { spawnSync } from 'child_process'
import inquirer from 'inquirer'

export type ChangeType = 'Active to Inactive' | 'Inactive to Active'
export const changeTypes = ['Active to Inactive', 'Inactive to Active']

export const change = async () => {
  const ask = await inquirer.prompt<{ change: ChangeType }>([
    {
      type: 'list',
      name: 'change',
      message:
        'Which side do you want to change?Always 1.Active -> Inactive then 2.Inactive -> Active',
      choices: changeTypes,
    },
  ])

  const alertMsg = `          ⚠️ Warning! ⚠️

You need to have SSH access to the other side of the node to change the identity.
Please make sure you have SSH access to the other side of the node before proceeding.

To create SSH public key, run the following command(Active Side):

$ solv scp init
$ solv scp cat

To copy the public key to the Inactive Side, run the following command(Inactive side):

$ solv scp create

Then, paste the public key to this side.

Please make sure you have done the above steps before proceeding.
You can check your connection by running the following command:

$ ssh solv@<IP_ADDRESS> ls
`

  if (ask.change === 'Active to Inactive') {
    console.log(chalk.yellow(alertMsg))
    const confirm = await inquirer.prompt<{ confirm: boolean }>([
      {
        type: 'confirm',
        name: 'confirm',
        message:
          'Do you have SSH access to the other side of the node?(You will need IP Address to proceed)',
        default: false,
      },
    ])
    if (!confirm.confirm) {
      return
    }
  }

  let ip = ''
  if (ask.change === 'Active to Inactive') {
    const askIp = await inquirer.prompt<{ ip: string }>([
      {
        type: 'input',
        name: 'ip',
        message: 'Enter Your New Validator IP',
        default: '0.0.0.0',
      },
    ])
    ip = askIp.ip
  }

  const beforeConfirm = await inquirer.prompt<{ confirm: boolean }>([
    {
      type: 'confirm',
      name: 'confirm',
      message:
        "Are you sure to change now?(After this, the Node's Identity will be changed, so you should be ready on the other side of the node, too.)",
      default: false,
    },
  ])
  if (!beforeConfirm.confirm) {
    return
  }

  if (ask.change === 'Active to Inactive') {
    await changeActiveSide(ip)
    const msg = `Now, you need to run the following command on the other side of the node:

$ solv change

Then, select 'Inactive to Active' and follow the instructions.`
    console.log(chalk.white(msg))
  } else {
    await changeInactiveSide()
  }
}

export const changeActiveSide = async (ip: string) => {
  const restartWindowCmd = `solana-validator -l /mnt/ledger wait-for-restart-window --min-idle-time 2 --skip-new-snapshot-check`
  spawnSync(restartWindowCmd, { shell: true, stdio: 'inherit' })
  const setIdentityCmd = `solana-validator -l /mnt/ledger set-identity /home/solv/unstaked-identity.json`
  spawnSync(setIdentityCmd, { shell: true, stdio: 'inherit' })
  spawnSync(
    'ln -sf /home/solv/unstaked-identity.json /home/solv/identity.json',
    { shell: true, stdio: 'inherit' },
  )
  spawnSync(
    `scp /mnt/ledger/tower-1_9-$(solana-keygen pubkey /home/solv/mainnet-validator-keypair.json).bin solv@${ip}:/mnt/ledger`,
    { shell: true, stdio: 'inherit' },
  )
}

export const changeInactiveSide = async () => {
  const restartWindowCmd = `solana-validator -l /mnt/ledger set-identity --require-tower /home/solv/mainnet-validator-keypair.json`
  spawnSync(restartWindowCmd, { shell: true, stdio: 'inherit' })
  const setIdentityCmd = `ln -sf /home/solv/mainnet-validator-keypair.json /home/solv/identity.json`
  spawnSync(setIdentityCmd, { shell: true, stdio: 'inherit' })
}
