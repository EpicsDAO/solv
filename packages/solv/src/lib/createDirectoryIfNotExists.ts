import { execSync } from 'node:child_process'

export function createDirectoryIfNotExists(path: string): void {
  try {
    // Check if the directory exists
    execSync(`test -d ${path}`)
    console.log(`${path} already exists.`)
  } catch {
    // If the directory does not exist, create it with sudo privileges
    execSync(`sudo mkdir -p ${path}`)
    console.log(`${path} has been created.`)
  }
}
