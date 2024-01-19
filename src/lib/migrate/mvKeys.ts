import { KEYPAIRS } from '@/config/config'
import { spawnSync } from 'child_process'
import { existsSync, mkdirSync, readdirSync } from 'fs'

export const mvKeys = () => {
  const oldKeyDir = '/mt/solana'
  if (!existsSync(oldKeyDir)) {
    console.log('No old dirs found 🙆')
    return
  }
  const backupDir = '/home/solv/solvKeys/backup'
  if (!existsSync(backupDir)) {
    mkdirSync(backupDir, { recursive: true })
  }
  // Get all *.json files in /mt/solana
  const oldKeys = readdirSync(oldKeyDir).filter((f) => f.endsWith('.json'))
  for (const key of oldKeys) {
    const oldKeyPath = `${oldKeyDir}/${key}`
    const backupPath = `${backupDir}/${key}`
    console.log(`Moving ${oldKeyPath} to ${backupPath}`)
    // mv oldKeyPath backupPath
    if (key === KEYPAIRS.TESTNET_VALIDATOR_KEY) {
      spawnSync(
        `sudo mv ${oldKeyPath} /home/solv/${KEYPAIRS.TESTNET_VALIDATOR_KEY}`,
        {
          shell: true,
          stdio: 'inherit',
        },
      )
      continue
    }
    if (key.includes('vote-account')) {
      spawnSync(
        `sudo mv ${oldKeyPath} /home/solv/${KEYPAIRS.TESTNET_VALIDATOR_VOTE_KEY}`,
        {
          shell: true,
          stdio: 'inherit',
        },
      )
      continue
    }
    if (key.includes('authority')) {
      spawnSync(
        `sudo mv ${oldKeyPath} /home/solv/${KEYPAIRS.TESTNET_VALITATOR_AUTHORITY_KEY}`,
        {
          shell: true,
          stdio: 'inherit',
        },
      )
      continue
    }

    spawnSync(`sudo mv ${oldKeyPath} ${backupPath}/${key}`, {
      shell: true,
      stdio: 'inherit',
    })
  }
  console.log(` 🙆 Done moving keys to ${backupDir}`)
}
