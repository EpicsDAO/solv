import { UbuntuDhParams } from '@/types/solvTypes'
import { execSync } from 'child_process'
import { convertToBytes } from '.'
import { Logger } from '@/lib/logger'

export const df = () => {
  const output = execSync('df -h').toString()
  const lines = output.split('\n').slice(1)

  const parsedData = lines
    .filter((line) => line.split(/\s+/)[0] !== '')
    .map((line) => {
      const segments = line.split(/\s+/)
      return {
        Filesystem: segments[0],
        Size: segments[1],
        Used: segments[2],
        Avail: segments[3],
        Use: segments[4],
        MountedOn: segments[5],
      } as UbuntuDhParams
    })
    .sort((a, b) => convertToBytes(b.Avail) - convertToBytes(a.Avail))
    .slice(0, 10)

  const isMountedOnCorrect = parsedData.some(
    (data) =>
      data.MountedOn === '/mnt' && convertToBytes(data.Size) > 900e9 - 1,
  )

  parsedData.forEach((data) => {
    if (data.MountedOn === '/mnt' && convertToBytes(data.Size) > 900e9 - 1) {
      console.log(
        `%c${data.Filesystem}\t${data.Size}\t${data.MountedOn}`,
        'color: green',
      )
    } else if (
      data.Filesystem.startsWith('/dev/') &&
      convertToBytes(data.Size) > 900e9 - 1
    ) {
      console.log(
        `%c${data.Filesystem}\t${data.Size}\t${data.MountedOn}`,
        'color: red',
      )
    }
  })

  if (isMountedOnCorrect) {
    console.log('your mount point is correct')
  } else {
    const fsNames = parsedData
      .filter(
        (data) =>
          data.Filesystem.startsWith('/dev/') &&
          convertToBytes(data.Size) > 900e9 - 1,
      )
      .map((data) => data.Filesystem)
    if (fsNames.length > 0) {
      console.log(
        Logger.warningHex(
          `\nfileSystem might be one of ${fsNames.join(', ')} ...?`,
        ),
      )
    }
  }

  return parsedData
}
