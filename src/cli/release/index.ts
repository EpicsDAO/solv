import { program } from '@/index'
import { mvDeb } from './mvDeb'
import { releaseDebian } from './releaseDebian'
import { ReleaseType } from '@/types/solvTypes'
import { changeLogWrite } from './genChangeLog'
import { sleep } from '@skeet-framework/utils'
import inquirer from 'inquirer'
import { Questions } from '@/types/questions'

export const releaseCommands = async () => {
  program
    .command('release')
    .description('release commands')
    .alias('r')
    .description('publish release')
    .option('-m, --mv', 'Only Move deb files to release folder', false)
    .action(async (options) => {
      const version = await askVersion()
      if (options.mv) {
        mvDeb(version)
      } else {
        const releaseTypes: ReleaseType[] = ['jammy', 'focal']
        for await (const releaseType of releaseTypes) {
          await sleep(1000)
          changeLogWrite(version, releaseType, 'Release')
          await releaseDebian(version)
        }
      }
    })
}

export const askVersion = async () => {
  const asking = inquirer.prompt(Questions.release)
  let version = ''
  await asking.then(async (answer: { version: string }) => {
    version = answer.version
  })
  return version
}
