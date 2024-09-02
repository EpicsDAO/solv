import { CommonSpawnOptions, spawnSync } from 'node:child_process'

export type ScpSSHResult = {
  status: number | null
  stdout: string
  stderr: string
}

const scpSSH = (
  ip: string,
  cmd: string,
  username = 'solv',
  stdio = 'inherit' as CommonSpawnOptions['stdio'],
  sshKeyPath = '~/.ssh/id_rsa',
) => {
  let scpSSHResult: ScpSSHResult
  try {
    const result = spawnSync(
      `ssh -i ${sshKeyPath} -o StrictHostKeyChecking=no ${username}@${ip} -p 22 'cd ~ && source ~/.profile && ${cmd}'`,
      { shell: true, stdio },
    )
    if (result.status !== 0) {
      console.log(
        `⚠️ CMD Failed. Please check your SSH connection.\n$ ssh ${username}@${ip}\n\nFailed Cmd: ${cmd}`,
      )
      scpSSHResult = {
        status: result.status,
        stdout: result.stdout.toString(),
        stderr: result.stderr.toString(),
      }
      return scpSSHResult
    }
    scpSSHResult = {
      status: result.status,
      stdout: result.stdout.toString(),
      stderr: result.stderr.toString(),
    }
    return scpSSHResult
  } catch (error) {
    console.log(`scpSSH Error: ${error}`)
    scpSSHResult = {
      status: null,
      stdout: '',
      stderr: String(error),
    }
    return scpSSHResult
  }
}

export default scpSSH
