import { execSync } from 'node:child_process'

export function isDirectoryMounted(mountPoint: string): boolean {
  try {
    // Execute the `findmnt` command to check if the directory is mounted
    const result = execSync(`findmnt ${mountPoint}`, { encoding: 'utf8' })

    // If the command returns output, the directory is mounted
    return result.includes(mountPoint)
  } catch (error) {
    // If an error occurs, it means the directory is not mounted
    return false
  }
}
