// updateSolanaSymlink.ts
import { SERVICE_PATHS } from '@/config/config'
import { execSync } from 'child_process'
import { existsSync, symlinkSync, unlinkSync } from 'fs'
import * as path from 'path'

export const updateJitoSolanaPath = () => {
  const LATEST_RELEASE_DIR = execSync(
    `ls -d ${SERVICE_PATHS.SOLANA_PATH}/releases/* | sort -V | tail -n 1`,
    { encoding: 'utf-8' },
  ).trim()
  const LATEST_SOLANA_BIN = path.join(LATEST_RELEASE_DIR, 'bin', 'solana')
  const SYMLINK_PATH = path.join(
    SERVICE_PATHS.SOLANA_PATH,
    'active_release',
    'bin',
    'solana',
  )
  const SYMLINK_PATH2 = path.join(
    SERVICE_PATHS.SOLANA_PATH,
    'active_release',
    'bin',
    'solana-validator',
  )

  try {
    // Delete the old symlink
    if (existsSync(SYMLINK_PATH)) {
      unlinkSync(SYMLINK_PATH)
    }
    // Create a new symlink
    symlinkSync(LATEST_SOLANA_BIN, SYMLINK_PATH)

    if (existsSync(SYMLINK_PATH2)) {
      unlinkSync(SYMLINK_PATH2)
    }

    symlinkSync(LATEST_SOLANA_BIN, SYMLINK_PATH2)
    console.log(
      `Updated symlink to the latest Solana release: ${LATEST_SOLANA_BIN}`,
    )
  } catch (error) {
    console.error('Failed to update the Solana symlink:', error)
  }
}
