import { spawnSync } from 'child_process'
import { existsSync, readdirSync, rmSync } from 'fs'
import { homedir } from 'os'
import { KEYPAIRS } from '@/config/config'
import path from 'path'
import { DefaultConfigType } from '@/config/types'
import { Network, NodeType } from '@/config/enums'

export const createSolvKeyPairs = (config: DefaultConfigType) => {
  let genKeys = []
  let keyNum = 0
  if (config.NODE_TYPE === NodeType.RPC) {
    genKeys = [KEYPAIRS.MAINNET_VALIDATOR_KEY]
    keyNum = 1
  }
  if (config.NETWORK === Network.TESTNET) {
    genKeys = [
      KEYPAIRS.TESTNET_VALIDATOR_KEY,
      KEYPAIRS.TESTNET_VALITATOR_AUTHORITY_KEY,
      KEYPAIRS.TESTNET_VALIDATOR_VOTE_KEY,
      KEYPAIRS.MAINNET_VALIDATOR_KEY,
      KEYPAIRS.MAINNET_VALITATOR_AUTHORITY_KEY,
      KEYPAIRS.MAINNET_VALIDATOR_VOTE_KEY,
    ]
    keyNum = 6
  } else {
    genKeys = [
      KEYPAIRS.MAINNET_VALIDATOR_KEY,
      KEYPAIRS.MAINNET_VALITATOR_AUTHORITY_KEY,
      KEYPAIRS.MAINNET_VALIDATOR_VOTE_KEY,
    ]
    keyNum = 3
  }

  const cmd = `solana-keygen grind --starts-and-ends-with E:SV:${keyNum}`
  spawnSync(cmd, { shell: true, stdio: 'ignore' })
  const files = readdirSync('./').filter((f) => f.endsWith('SV.json'))
  const keyDir = homedir()
  const unstakedKeyPath = path.join(keyDir, 'unstaked-identity.json')
  if (existsSync(unstakedKeyPath)) {
    spawnSync(`mv ${unstakedKeyPath} ${keyDir}/unstaked-identity.backup.json`, {
      shell: true,
      stdio: 'ignore',
    })
  }
  let i = 0
  for (const file of files) {
    const keyPath = path.join(keyDir, genKeys[i])
    i++
    if (existsSync(keyPath)) {
      console.log(`${keyPath} is already exist!`)
      rmSync(file, { recursive: true })
      continue
    }
    const cmd = `mv ${file} ${keyPath}`
    spawnSync(cmd, { shell: true, stdio: 'inherit' })
  }
  spawnSync(
    'solana-keygen new -s --no-bip39-passphrase -o /home/solv/unstaked-identity.json',
    { shell: true, stdio: 'ignore' },
  )
  console.log(`Generated keypairs - ${keyDir}`)
}
