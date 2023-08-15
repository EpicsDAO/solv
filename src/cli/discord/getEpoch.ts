import { execSync } from 'child_process'

export const getEpoch = () => {
  try {
    const cmd = `solana --url http://127.0.0.1:8899 slot`
    const epoch = execSync(cmd, { encoding: 'utf-8' }).toString()
    return epoch
  } catch (error) {
    throw new Error(`epoch Error: ${error}`)
  }
}
