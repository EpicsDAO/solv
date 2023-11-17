import { SSH_PUBKEY_PATH } from '@/config'
import { spawnSync } from 'child_process'
import inquirer from 'inquirer'

export const create = async () => {
  const answer = await inquirer.prompt<{ pubkey: string }>({
    type: 'input',
    name: 'pubkey',
    message: 'Enter your SSH Public Key',
    default() {
      return 'xxxxxxxpubkeyxxxxxxxx'
    },
  })

  const cmd = `mkdir -p /home/solv/.ssh && echo "${answer.pubkey}" >> ${SSH_PUBKEY_PATH}`
  spawnSync(cmd, { shell: true, stdio: 'inherit' })
  console.log(`Successfully Created SSH Login Setting 🎉`)
}
