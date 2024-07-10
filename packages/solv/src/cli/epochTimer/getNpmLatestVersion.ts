async function getNpmLatestVersion(packageName = '@epics-dao/solv') {
  try {
    const url = `https://registry.npmjs.org/${packageName}`
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = (await response.json()) as Record<string, any>
    const latestVersion = data['dist-tags'].latest
    return latestVersion as string
  } catch (error) {
    console.error(
      `Error fetching latest version for package ${packageName}:`,
      error,
    )
    return null
  }
}

export default getNpmLatestVersion
