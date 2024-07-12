import { homedir } from 'os'
import { join } from 'path'

const getHomeDir = (): string => {
  const homeDir = homedir()
  const home = homeDir.includes('solv')
    ? homeDir
    : join(homeDir, 'solvKeys', 'upload')
  return home
}

export default getHomeDir
