import { SERVICE_PATHS } from '@/config/config'
import { execSync } from 'child_process'

export const rmServices = async () => {
  console.log('rmServices')
  const paths = [SERVICE_PATHS.SOL_LOGROTATE, SERVICE_PATHS.SOL_SERVICE]
  for (const path of paths) {
    console.log(`removing ${path}`)
    execSync(`sudo rm ${path}`)
  }
}
