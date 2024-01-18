import { SERVICE_PATHS } from '@/config/config'
import { execSync } from 'child_process'
import inquirer from 'inquirer'

export const uninstall = async () => {
  const confirm = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'confirm',
      message: 'Are you sure you want to uninstall Solv?',
      default() {
        return false
      },
    },
  ])
  if (!confirm.confirm) {
    return false
  }
  console.log('Uninstalling Solv...')
  execSync(`sudo systemctl stop solv`)

  const servicePaths = Object.values(SERVICE_PATHS)
  servicePaths.push('/mnt/*')

  // Remove all solv.service files
  for (const path of servicePaths) {
    console.log(`Removing ${path}`)
    execSync(`sudo rm -rf ${path}`)
  }

  // Backup all *.json files in ~/
  const homePaths = execSync(`ls ~/ | grep .json`).toString().split('\n')
  for (const path of homePaths) {
    // move *.json files to ~/solvKeys/trash
    const solvTrashPath = '~/solvKeys/trash'
    if (!execSync(solvTrashPath)) {
      execSync(`mkdir -p ${solvTrashPath}`)
    }
    if (path) {
      // console.log(`Moving ${path} to ~/solvKeys/trash`)
      execSync(`sudo mv ~/${path} ~/solvKeys/trash`)
    }
  }
  // remove all files in ~/
  execSync(`sudo rm -rf ~/*`)
  execSync(`sudo systemctl daemon-reload`)
  console.log('Completely uninstalled Solv ⭐️')
}
