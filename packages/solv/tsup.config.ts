import { defineConfig } from 'tsup'
import { readFile, writeFile, appendFile } from 'fs/promises'
const writer = async (file: string) => {
  try {
    const currentFile = await readFile(file)
    const currentFileString = String(currentFile)
    await writeFile(file, '#!/usr/bin/env node\n', { flag: 'w' })
    await appendFile(file, currentFileString)
  } catch (e) {
    console.log(e)
  }
}
export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  outDir: 'dist',
  bundle: true,
  minify: true,
  sourcemap: true,
  clean: true,
  dts: true,
  external: [
    'child_process',
    'os',
    'fs',
    'inquirer',
    'chalk',
    'fs/promises',
    '@solana/web3.js',
    '@metaplex-foundation/mpl-token-metadata',
    '@metaplex-foundation/umi',
    '@metaplex-foundation/umi-bundle-defaults',
    '@skeet-framework/utils',
    '@solana/spl-stake-pool',
    '@solana/spl-token',
    'bs58',
    'commander',
    'dotenv',
    'node-cron',
    'node-fetch',
    'prompt',
    'cli-progress',
    'cli-spinner',
    'cli-table3',
  ],
})
