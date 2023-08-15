import { execSync } from 'child_process'
import Table from 'cli-table3'

export const du = (path = '/mt/*'): number => {
  // Sanitize the path to prevent command injection
  const sanitizedPath = path.replace(/[^a-zA-Z0-9_\-\/. ]/g, '')

  // Get the size in bytes
  const output = execSync(`du -sb ${sanitizedPath}`).toString()

  // Extract the size part and convert to number
  const size = parseInt(output.split('\t')[0], 10)

  return size
}

export const logDiskUsage = (path = '/mt/*') => {
  const sanitizedPath = path.replace(/[^a-zA-Z0-9_\-\/. ]/g, '')

  const used = du(sanitizedPath)

  // Get total disk capacity using df command
  const dfOutput = execSync(`df ${sanitizedPath}`).toString().split('\n')

  if (dfOutput.length < 2) {
    console.error('Failed to retrieve disk usage details')
    return
  }

  const dfDetails = dfOutput[1].split(/\s+/)
  const total = parseInt(dfDetails[1], 10) * 1024 // Convert from 1K-blocks to bytes

  // Create table using cli-table3
  const table = new Table({
    head: ['Parameter', 'Size (in bytes)'],
    colWidths: [20, 20],
  })

  table.push(['Total', total], ['Used', used], ['Available', total - used])

  console.log(table.toString())
}
