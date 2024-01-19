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
      line.includes('/mnt/ramdrive')
    )
  })

  if (lines.length !== filteredLines.length) {
    writeFileSync(fstabPath, filteredLines.join('\n') + '\n', 'utf8')
    console.log(`Removed specified lines from ${fstabPath}`)
  } else {
    console.log('No specified lines found to remove in /etc/fstab')
  }
}
