import getNpmLatestVersion from './getNpmLatestVersion'
import getSolvVersion from './getSolvVersion'

async function isVersionSame() {
  const solvVersion = getSolvVersion()
  const latestVersion = await getNpmLatestVersion()
  console.log('currentVersion:', solvVersion)
  console.log('latestVersion:', latestVersion)
  return solvVersion === latestVersion
}

export default isVersionSame
