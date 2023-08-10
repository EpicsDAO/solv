import { spawnSync } from 'child_process'

export const setup = async () => {
  const cmd = ['sudo adduser solv']
  spawnSync(cmd.join(' && '), { shell: true, stdio: 'inherit' })
  const cmd2 = ['sudo usermod -aG sudo solv']
  spawnSync(cmd2.join(' && '), { shell: true, stdio: 'inherit' })
  const cmd3 = ['sudo su solv']
  spawnSync(cmd3.join(' && '), { shell: true, stdio: 'inherit' })
  const cmd4 = ['sudo apt update -y']
  spawnSync(cmd4.join(' && '), { shell: true, stdio: 'inherit' })
  const cmd5 = ['sudo apt upgrade -y']
  spawnSync(cmd5.join(' && '), { shell: true, stdio: 'inherit' })
  const cmd6 = ['sudo apt install -y zsh']
  spawnSync(cmd6.join(' && '), { shell: true, stdio: 'inherit' })
  const cmd7 = [
    'sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"',
  ]
  spawnSync(cmd7.join(' && '), { shell: true, stdio: 'inherit' })
  const cmd8 = ['sudo apt install -y nodejs']
  spawnSync(cmd8.join(' && '), { shell: true, stdio: 'inherit' })
}
