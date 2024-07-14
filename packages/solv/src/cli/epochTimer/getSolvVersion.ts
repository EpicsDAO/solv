import * as packageJson from '../../../package.json'

const getSolvVersion = () => {
  const version = packageJson.version
  return version
}

export default getSolvVersion
