import { spawnSync } from 'child_process'
import * as dotenv from 'dotenv'
import { mvDeb } from './mvDeb'
import { Logger } from '@/lib/logger'
dotenv.config()

const GPG_SECRET = process.env.GPG_SECRET || ''

export const releaseDebian = async (version: string) => {
  const debuild1 = ['debuild', '-us', '-uc']
  spawnSync(debuild1.join(' '), {
    shell: true,
    stdio: 'inherit',
    cwd: 'solv-debian/debian',
  })
  const debuild2 = ['debuild', '-S', '-sa']
  spawnSync(debuild2.join(' '), {
    shell: true,
    stdio: 'inherit',
    cwd: 'solv-debian/debian',
  })
  const design = ['debsign', `-k${GPG_SECRET}`, `solv_${version}_*.changes`]
  spawnSync(design.join(' '), { shell: true, stdio: 'inherit' })
  mvDeb(version)
  Logger.normal(`Release ${version} complete!`)
}
