import type { DefaultConfigType } from '@/config/defaultConfig.ts'
import DEFAULT_CONFIG from '@/config/defaultConfig.ts'

const loadConfig = async (): Promise<DefaultConfigType> => {
  const home = Deno.env.get('HOME')
  const configPath = `${home}/solv5.config.json`
  // chekc if the file exists
  try {
    await Deno.stat(configPath)
  } catch (_error) {
    // Create Default Config
    await Deno.writeTextFile(
      configPath,
      JSON.stringify(DEFAULT_CONFIG, null, 2),
    )
  }
  const configText = await Deno.readTextFile(configPath)
  const config: DefaultConfigType = JSON.parse(configText)
  return config
}

export default loadConfig
