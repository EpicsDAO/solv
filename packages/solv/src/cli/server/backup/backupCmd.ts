import { scpCreate } from '@/cli/scp/create'
import { spawnSync } from 'child_process'

export const backupCmd = async () => {
  const cmd = `curl ifconfig.me`
  const { stdout } = spawnSync(cmd, { shell: true, stdio: 'pipe' })
  const idRsaPubkeyText = `Please go to your local computer and get RSA Pubkey with the following command:

$ solv scp cat

Your Validator's IP: ${stdout}

Then, copy the output and paste it here:`
  console.log(idRsaPubkeyText)
  await scpCreate()
  const text = `Please go to your local computer and run the following command:
  
$ solv scp download

This will download your Solana Validator Keypair to your local computer.
File Dir: ~/solvKeys/download/
`
  console.log(text)
}
