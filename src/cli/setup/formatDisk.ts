import { spawnSync } from 'child_process'

export const formatDisk = (fileSystem: string) => {
  // Check if the disk is already formatted
  const checkDisk = spawnSync(`sudo blkid ${fileSystem}`, {
    shell: true,
    encoding: 'utf8',
  })

  // If the output is empty, the disk is not formatted
  if (!checkDisk.stdout.trim()) {
    const cmd = `sudo mkfs.ext4 ${fileSystem}`
    spawnSync(cmd, { shell: true, stdio: 'inherit' })
    console.log(`${fileSystem} has been formatted.`)
  } else {
    console.log(`${fileSystem} is already formatted.`)
  }
}
