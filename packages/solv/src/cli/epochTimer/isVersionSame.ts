import getNpmLatestVersion from './getNpmLatestVersion'
import getSolvVersion from './getSolvVersion'

async function isVersionSame() {
  return getSolvVersion() === (await getNpmLatestVersion())
}

export default isVersionSame
