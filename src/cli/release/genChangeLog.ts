import { readFileSync, writeFileSync } from 'fs'
import { format } from 'date-fns'
import { ReleaseType, SolvPaths } from '@/types/solvTypes'

export const changeLogWrite = (
  version: string,
  releaseType: ReleaseType,
  updateInfo: string
) => {
  try {
    let newEntry = ''

    const date = new Date()
    const formattedDate = format(date, 'EEE, dd MMM yyyy HH:mm:ss') + ' +0200'

    if (releaseType === 'jammy') {
      newEntry = `solv (${version}+jammy1) jammy; urgency=medium\n   * ${updateInfo}\n\n -- EpicsDAO <info@epics.dev>  ${formattedDate}\n\n`
    } else if (releaseType === 'focal') {
      newEntry = `solv (${version}) focal; urgency=medium\n   * ${updateInfo}\n\n -- EpicsDAO <info@epics.dev>  ${formattedDate}\n\n`
    } else {
      console.error('Invalid release type. Expected "jammy" or "focal".')
      return
    }

    const file = readFileSync(SolvPaths.CHANGE_LOG_PATH, 'utf8')
    const newFile = newEntry + file
    writeFileSync(SolvPaths.CHANGE_LOG_PATH, newFile, {
      flag: 'w',
    })
  } catch (error) {
    throw new Error(`changeLogWrite Error: ${error}`)
  }
}
