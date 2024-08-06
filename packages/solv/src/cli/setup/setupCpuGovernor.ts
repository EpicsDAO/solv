import { execSync } from 'child_process'

const setupCpuGovernor = async () => {
  try {
    const cmd = `echo "performance" | sudo tee /sys/devices/system/cpu/cpu*/cpufreq/scaling_governor`
    execSync(cmd)
  } catch (error) {
    console.error(
      'Error setting up CPU Governor\nPlease Check your cpu governor yourself',
      error,
    )
  }
}

export default setupCpuGovernor
