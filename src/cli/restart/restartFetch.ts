import { SOLV_TYPES, startupScriptPaths } from '@/config/config'
import { getStartupScript } from '@/template/getStartupScript'
import { deleteSnapshot } from './deleteSnapshot'
import { chmodSync, writeFileSync } from 'fs'
import { restartSolv } from './restartSolv'

export const restartFetch = (solvTypes: SOLV_TYPES) => {
  const { scriptPath } = startupScriptPaths()
  const script = getStartupScript(true, solvTypes)
  deleteSnapshot()
  writeFileSync(scriptPath, script)
  chmodSync(scriptPath, '755')
  restartSolv()
}
