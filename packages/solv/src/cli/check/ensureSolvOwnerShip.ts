import { spawnSync } from 'child_process'

export const ensureSolvOwnership = (dir: string = '/mt'): void => {
  const output = spawnSync(`find ${dir} -not -user solv`, {
    shell: true,
    encoding: 'utf8',
  })
  if (output.stdout) {
    spawnSync(`chown -R solv:solv ${dir}`, { shell: true })
  }
}
