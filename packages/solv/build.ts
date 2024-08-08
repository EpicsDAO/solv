import { build } from 'esbuild'

void (async () => {
  await build({
    entryPoints: ['./src/index.ts'],
    bundle: true,
    minify: true,
    outfile: './dist/index.js',
    platform: 'node',
    define: {
      'process.env.NODE_ENV': `"production"`,
    },
    format: 'esm',
    tsconfig: './tsconfig.json',
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
})()
