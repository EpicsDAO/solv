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
  const dput = ['dput', 'ppa:epics-dao/solv', `solv_${version}_source.changes`]
  spawnSync(dput.join(' '), { shell: true, stdio: 'inherit' })
  mvDeb(version)
  const yarnCmd = ['yarn', 'build']
  spawnSync(yarnCmd.join(' '), { shell: true, stdio: 'inherit' })
  const commitCmds = [
    'git add .',
    `git commit -m "Release ${version}"`,
    // `git tag -a ${version} -m "Release ${version}"`,
    // 'git push',
    `git push origin main`,
  ]
  for (const cmd of commitCmds) {
    spawnSync(cmd, { shell: true, stdio: 'inherit' })
  }
  const releaseCmds = [`npm publish`]
  for (const cmd of releaseCmds) {
    spawnSync(cmd, { shell: true, stdio: 'inherit' })
  }
  Logger.normal(`Release ${version} complete!`)
}
