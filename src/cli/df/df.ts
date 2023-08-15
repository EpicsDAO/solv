import { UbuntuDhParams } from '@/types/solvTypes'
import { execSync } from 'child_process'

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
    (data) => data.MountedOn === '/mt' && convertToBytes(data.Size) >= 900e9
  )

  parsedData.forEach((data) => {
    if (data.MountedOn === '/mt' && convertToBytes(data.Size) >= 900e9) {
      console.log(
        `%c${data.Filesystem}\t${data.Size}\t${data.MountedOn}`,
        'color: green'
      )
    } else if (
      data.Filesystem.startsWith('/dev/') &&
      convertToBytes(data.Size) >= 900e9
    ) {
      console.log(
        `%c${data.Filesystem}\t${data.Size}\t${data.MountedOn}`,
        'color: red'
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
          convertToBytes(data.Size) >= 900e9
      )
      .map((data) => data.Filesystem)
    if (fsNames.length > 0) {
      console.log(
        `Consider mounting the following devices as they have more than 900GB of space: ${fsNames.join(
          ', '
        )}`
      )
    }
  }

  return parsedData
}

const convertToBytes = (size: string): number => {
  const units: { [key: string]: number } = {
    K: 1e3,
    M: 1e6,
    G: 1e9,
    T: 1e12,
  }
  const unit = size.slice(-1)
  const number = parseFloat(size.slice(0, -1))

  return units[unit] ? number * units[unit] : number
}
