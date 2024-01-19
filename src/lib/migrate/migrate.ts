import { spawnSync } from 'child_process'
import { mvKeys } from '@/lib/migrate/mvKeys'
import { removeFstabEntries } from '@/lib/migrate/rmFstab'
import { rmServices } from '@/lib/migrate/rmServices'
import { rmMtDir } from '@/lib/migrate/rmMtDir'
import { migrateSetup } from '@/lib/migrate/migrateSetup'
import { sleep } from '@skeet-framework/utils'
import { rmSwap } from './rmSwap'
import inquirer from 'inquirer'

export const migrate = async () => {
  // const confirm = await inquirer.prompt([
  //   {
  //     type: 'confirm',
  //     name: 'confirm',
  //     message: 'Are you sure you want to migrate solv3?',
  //     default() {
  //       return false
  //     },
  //   },
  // ])
  // if (!confirm.confirm) {
  //   return false
  // }
  // console.log('Stopping solv service...')
  // spawnSync('sudo systemctl stop solv', { shell: true, stdio: 'inherit' })
  // await sleep(7000)
  // mvKeys()
  // rmSwap()
  // removeFstabEntries()
  // rmServices()
  // rmMtDir()
  migrateSetup()
}
