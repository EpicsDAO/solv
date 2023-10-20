import {
  SOL_NOFILES_CONF_PATH,
  SOL_SYSTEM_CONF,
  SOL_SYSTEM_CONFIG21_PATH,
} from '@/config'
import { execSync } from 'child_process'
import { existsSync } from 'fs'

export function setupSystemd(): void {
  if (!existsSync(SOL_SYSTEM_CONFIG21_PATH)) {
    console.log('Creating solana-validator.conf sysctl configuration file')

    const sysctlConfig = `
# Increase UDP buffer sizes
net.core.rmem_default = 134217728
net.core.rmem_max = 134217728
net.core.wmem_default = 134217728
net.core.wmem_max = 134217728

# Increase memory mapped files limit
vm.max_map_count = 1000000

# Increase number of allowed open file descriptors
fs.nr_open = 1000000
`

    const nofilesConfig = `
# Increase process file descriptor count limit
* - nofile 1000000
`

    // Write sysctl configuration
    execSync(
      `echo "${sysctlConfig}" | sudo tee ${SOL_SYSTEM_CONFIG21_PATH} > /dev/null`
    )

    // Apply sysctl configuration
    execSync(`sudo sysctl -p ${SOL_SYSTEM_CONFIG21_PATH}`)

    // Update systemd configuration
    execSync(
      `echo "DefaultLimitNOFILE=1000000" | sudo tee -a ${SOL_SYSTEM_CONF}`
    )

    // Write nofiles configuration
    execSync(
      `echo "${nofilesConfig}" | sudo tee ${SOL_NOFILES_CONF_PATH} > /dev/null`
    )
  }
}
