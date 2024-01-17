import { HOME_PATHS } from '@/config/config'
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

  const cmd = `mkdir -p ${HOME_PATHS.ROOT}/.ssh && echo "${answer.pubkey}" >> ${HOME_PATHS.AUTHORIZED_KEYS}`
  spawnSync(cmd, { shell: true, stdio: 'inherit' })
  console.log(`Successfully Created SSH Login Setting 🎉`)
}
