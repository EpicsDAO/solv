import { spawnSync } from 'child_process'
import { readFileSync, writeFileSync } from 'fs'

export const removeFstabEntries = () => {
  const fstabPath = '/etc/fstab'
  const fstabContent = readFileSync(fstabPath, 'utf8')

  // Backup fstab in case something goes wrong
  spawnSync(`sudo cp ${fstabPath} ${fstabPath}.backup`, {
    shell: true,
    encoding: 'utf8',
  })
  console.log(`✅ Backed up ${fstabPath} to ${fstabPath}.backup`)

  const lines = fstabContent.split('\n')
  const filteredLines = lines.filter((line) => {
    return !(
      line.includes('/mt/swapfile') ||
      (line.includes('/dev/') && line.includes('/mt')) ||
      (line.includes('/dev/') && line.includes('/mnt')) ||
      line.includes('/mnt/ramdrive') ||
      line.includes('/mnt/solana')
    )
  })

  if (lines.length !== filteredLines.length) {
    const addCmd = `echo "${filteredLines.join('\n')}" | sudo tee ${fstabPath}`
    spawnSync(addCmd, {
      shell: true,
      encoding: 'utf8',
    })

    const cmd = "sudo sed -i '/\\/mt\\/swapfile/d' /etc/fstab"
    spawnSync(cmd, { shell: true, stdio: 'inherit' })

    console.log(`Removed specified lines from ${fstabPath}`)
  } else {
    console.log('No specified lines found to remove in /etc/fstab')
  }
}
