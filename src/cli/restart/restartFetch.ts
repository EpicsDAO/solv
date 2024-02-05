import { startupScriptPaths } from '@/config/config'
import { deleteSnapshot } from './deleteSnapshot'
import { chmodSync, readFileSync, writeFileSync } from 'fs'
import { restartSolv } from './restartSolv'

export const restartFetch = () => {
  const { scriptPath } = startupScriptPaths()
  let script = readFileSync(scriptPath, 'utf-8')

  // Delete the first line and the second line
  script = script
    .replace('#!/bin/bash\n', '')
    .replace('exec solana-validator \\\n', '')

  // Split the script into an array of options
  let options = script.split('\n')

  options = options.filter((option) => option !== '--no-incremental-snapshots')
  // add --no-snapshot-fetch and --no-genesis-fetch if not exists
  if (!options.includes('--no-snapshot-fetch')) {
    options.push('--no-snapshot-fetch')
  }
  if (!options.includes('--no-genesis-fetch')) {
    options.push('--no-genesis-fetch')
  }

  // Make the script
  script = `#!/bin/bash\nexec solana-validator \\\n${options.join(' \\\n')}`
  deleteSnapshot()
  writeFileSync(scriptPath, script)
  chmodSync(scriptPath, '755')
  restartSolv()
}
