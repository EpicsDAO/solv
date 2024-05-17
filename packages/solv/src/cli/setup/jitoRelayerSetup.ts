import { relayerService } from '@/template/relayerService'
import { execSync, spawnSync } from 'child_process'
import { writeFile } from 'fs/promises'

export const jitoRelayerSetup = async (blockEngineUrl: string) => {
  // Create openssl keypair
  spawnSync('openssl', ['genrsa', '-out', '/home/solv/private.pem'], {
    stdio: 'inherit',
    shell: true,
  })
  spawnSync(
    'openssl',
    [
      'rsa',
      '-in',
      '/home/solv/private.pem',
      '-pubout',
      '-out',
      '/home/solv/public.pem',
    ],
    { stdio: 'inherit', shell: true },
  )

  // Create relayer keypair
  spawnSync(
    'solana-keygen',
    [
      'new',
      '--no-bip39-passphrase',
      '--outfile',
      '/home/solv/relayer-keypair.json',
    ],
    { stdio: 'inherit', shell: true },
  )

  // Clone and build relayer
  spawnSync(
    'git',
    ['clone', 'https://github.com/jito-foundation/jito-relayer.git'],
    {
      stdio: 'inherit',
      shell: true,
    },
  )
  spawnSync('git', ['submodule', 'update', '--init', '--recursive'], {
    cwd: 'jito-relayer',
    stdio: 'inherit',
    shell: true,
  })
  spawnSync('cargo', ['build', '--release'], {
    cwd: 'jito-relayer',
    stdio: 'inherit',
    shell: true,
  })

  // Create relayer service
  const { filePath, body } = relayerService(blockEngineUrl)
  execSync(`echo "${body}" | sudo tee ${filePath} > /dev/null`)
  spawnSync('sudo', ['systemctl', 'enable', 'relayer'], { stdio: 'inherit' })

  spawnSync('sudo', ['systemctl', 'start', 'relayer'], { stdio: 'inherit' })

  // Update firewall
  execSync('sudo ufw allow 11228', { stdio: 'inherit' })
  execSync('sudo ufw allow 11229', { stdio: 'inherit' })

  // Update startup script
}
