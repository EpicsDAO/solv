import { execSync } from 'child_process'

export async function isSwapAllocated(swapPath: string) {
  try {
    const result = execSync('swapon --show').toString()
    const swapFiles = result
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean)
    return swapFiles.includes(swapPath)
  } catch (error) {
    console.error('Error checking swap status:', error)
    return false
  }
}
