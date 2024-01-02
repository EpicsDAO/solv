import { execSync } from 'child_process'

export const getEpoch = () => {
  try {
    const cmd = `solana epoch --commitment finalized -ul`
    const epoch = execSync(cmd, { encoding: 'utf-8' }).toString()
    return epoch.replace(/\n/g, '')
  } catch (error) {
    return `getEpoch Error: ${error}`
  }
}

export const getEpochRemote = () => {
  try {
    const cmd = `solana epoch`
    const epoch = execSync(cmd, { encoding: 'utf-8' }).toString()
    return epoch.replace(/\n/g, '')
  } catch (error) {
    return `getEpoch Error: ${error}`
  }
}