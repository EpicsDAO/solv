import { execSync } from 'child_process'

const updateOpenSSH = () => {
  execSync(
    `sudo apt-get update && sudo sudo apt upgrade openssh-server openssh-client -y`,
    { stdio: 'inherit' },
  )
}

export default updateOpenSSH
