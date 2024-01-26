import { SOLV_TYPES, startupScriptPaths } from '@/config/config'
import { getStartupScript } from '@/template/getStartupScript'
import { chmodSync, writeFileSync } from 'fs'
import { restartSolv } from './restartSolv'

export const restartNoFetch = (solvTypes: SOLV_TYPES) => {
  const { scriptPath } = startupScriptPaths()
  const script = getStartupScript(false, solvTypes)
  writeFileSync(scriptPath, script)
  chmodSync(scriptPath, '755')
  restartSolv()
}
