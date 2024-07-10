import { execSync } from 'node:child_process'

const getSolvVersion = () => {
  const cmd = `solv -V`
  const result = execSync(cmd).toString().trim()
  const split = result.split('\n')
  let version = split.length > 1 ? split[1] : split[0]
  version = version.replace('v', '').trim()
  return version
}

export default getSolvVersion
