import { MT_PATHS } from '@/config/config'
import { spawnSync } from 'child_process'

export const ensureFstabEntries = (
  fileSystem: string,
  fileSystem2 = '',
  isDouble = false,
) => {
  const mountPoint = isDouble ? MT_PATHS.LEDGER : MT_PATHS.ROOT
  const mtLineSingle = `${fileSystem}        ${mountPoint}     ext4 auto 0 0`
  const mtLineForDouble = `${fileSystem}        ${MT_PATHS.LEDGER}     ext4 auto 0 0
${fileSystem2}        ${MT_PATHS.ACCOUNTS}     ext4 auto 0 0
`
  const mtLine = fileSystem2 !== '' ? mtLineForDouble : mtLineSingle

  const lines = [mtLine]
  const output = spawnSync(`cat /etc/fstab`, {
    shell: true,
    encoding: 'utf8',
  })

  const fstabContent = output.stdout

  const linesToAdd = []

  for (const line of lines) {
    if (!fstabContent.includes(line)) {
      linesToAdd.push(line)
    }
  }

  if (linesToAdd.length) {
    const addCmd = `echo "${linesToAdd.join('\n')}" | sudo tee -a /etc/fstab`
    spawnSync(addCmd, {
      shell: true,
      encoding: 'utf8',
    })
    const reloadCmd = `sudo mount --all --verbose`
    spawnSync(reloadCmd, {
      shell: true,
      encoding: 'utf8',
    })
    console.log(`Added lines to /etc/fstab: \n${linesToAdd.join('\n')}`)
  } else {
    console.log('All lines are already present in /etc/fstab')
  }
}
