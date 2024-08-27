import { spawnSync } from 'node:child_process'

export type EpochInfoCLIType = {
  epoch: number
  day: number
  hour: number
  min: number
  sec: number
  totalMinutes: number
  epochRemainingTime: string
  epochCompletedPercent: string
}

export const getEpochInfoByRust = (rpcUrl: string) => {
  try {
    const cmd = `solana epoch-info --url '${rpcUrl}'`
    const { stdout } = spawnSync(cmd, { shell: true, stdio: 'pipe' })
    const epochInfo = stdout.toString()

    // 'Epoch Completed Time:' 行を探す
    const splitedLine = epochInfo.split('\n')
    const epochCompletedTime = splitedLine.find((line) =>
      line.includes('Epoch Completed Time:'),
    )
    const epochCompletedPercent = splitedLine
      .find((line) => line.includes('Epoch Completed Percent:'))
      ?.replace('Epoch Completed Percent:', '')
    const epoch = Number(
      splitedLine
        .find((line) => line.includes('Epoch:'))
        ?.replace('Epoch:', ''),
    )

    if (!epochCompletedTime || !epochCompletedPercent || !epoch) {
      throw new Error('Epoch Completed Time not found')
    }

    // 'remaining' の時間部分を抽出
    const splitedEpochCompletedTime = epochCompletedTime.split('(')
    const remainingTime = splitedEpochCompletedTime[1].replace(
      ' remaining)',
      '',
    )
    console.log('remainingTime:', remainingTime)

    // 正規表現で day, hour, min, sec を抽出
    const timeRegex =
      /(?:(\d+)day\s*)?(?:(\d+)h\s*)?(?:(\d+)m\s*)?(?:(\d+)s\s*)?/

    const match = remainingTime.match(timeRegex)
    if (match) {
      const day = match[1] ? parseInt(match[1]) : 0
      const hour = match[2] ? parseInt(match[2]) : 0
      const min = match[3] ? parseInt(match[3]) : 0
      const sec = match[4] ? parseInt(match[4]) : 0

      // 分に変換
      const totalMinutes =
        day * 24 * 60 + hour * 60 + min + Math.floor(sec / 60)

      const res: EpochInfoCLIType = {
        epoch,
        day,
        hour,
        min,
        sec,
        totalMinutes,
        epochRemainingTime: remainingTime,
        epochCompletedPercent,
      }
      return res
    } else {
      throw new Error('Time information could not be parsed')
    }
  } catch (error) {
    throw new Error(`getEpochInfoByRust failed: ${error}`)
  }
}
