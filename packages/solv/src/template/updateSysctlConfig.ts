import fs from 'fs'
import { promisify } from 'util'
import { execSync } from 'child_process'

const readFile = promisify(fs.readFile)
const access = promisify(fs.access)

const path = '/etc/sysctl.conf'

const sysconfig = `# set default and maximum socket buffer sizes to 128MB
net.core.rmem_default=134217728
net.core.wmem_default=134217728
net.core.rmem_max=134217728
net.core.wmem_max=134217728

# set minimum, default, and maximum tcp buffer sizes (10k, 87.38k (linux default), 128MB resp)
net.ipv4.tcp_rmem=10240 87380 134217728
net.ipv4.tcp_wmem=10240 87380 134217728

# Enable TCP westwood for kernels greater than or equal to 2.6.13
net.ipv4.tcp_congestion_control=westwood`

async function updateSysctlConfig(): Promise<void> {
  try {
    // Check if the file exists
    await access(path, fs.constants.F_OK)
  } catch (err) {
    return console.log(`Skipping updateSysctlConfig: ${path} does not exist`)
  }
  try {
    const data = await readFile(path, 'utf8')

    if (!data.includes('rmem_default')) {
      console.log('No need to update sysctl.conf')
      return
    }
    // Remove existing relevant lines
    let updatedConfig = data.replace(
      /net\.core\.(rmem_default|wmem_default|rmem_max|wmem_max)=.*\n/g,
      '',
    )
    updatedConfig = updatedConfig.replace(
      /net\.ipv4\.tcp_(rmem|wmem|congestion_control)=.*\n/g,
      '',
    )

    // Append new configuration
    updatedConfig += `\n${sysconfig}\n`

    // Write to the file using execSync and sudo tee
    execSync(`echo "${updatedConfig}" | sudo tee ${path} > /dev/null`)
    execSync('sudo sysctl -p')
    console.log('sysctl.conf updated successfully')
  } catch (err) {
    console.error(`Error: ${err}`)
  }
}

export default updateSysctlConfig
