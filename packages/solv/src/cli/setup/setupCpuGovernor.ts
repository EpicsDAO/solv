import { execSync } from 'child_process'

const setupCpuGovernor = async () => {
  const cmd = `echo "performance" | sudo tee /sys/devices/system/cpu/cpu*/cpufreq/scaling_governor`
  execSync(cmd)
}

export default setupCpuGovernor
