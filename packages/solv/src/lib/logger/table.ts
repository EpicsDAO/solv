import { UbuntuDhParams } from '@/types/solvTypes'
import chalk from 'chalk'
import Table from 'cli-table3'

export const displayTable = (data: UbuntuDhParams[]) => {
  const head = ['Filesystem', 'Size', 'Used', 'Avail', 'Use', 'MountedOn'].map(
    (item) => chalk.blue(item)
  )
  // テーブルのヘッダーを定義
  const table = new Table({
    head,
    colWidths: [20, 10, 10, 10, 10, 20],
  })

  // 各行のデータをテーブルに追加
  data.forEach((row) => {
    table.push(
      [
        row.Filesystem,
        row.Size,
        row.Used,
        row.Avail,
        row.Use,
        row.MountedOn,
      ].map((item) => chalk.white(item))
    )
  })

  // テーブルを表示
  console.log(table.toString())
}
