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
  format: ['cjs', 'esm'],
  outDir: 'dist',
  bundle: true,
  minify: true,
  sourcemap: true,
  clean: true,
  dts: true,
  external: [
    'dotenv',
    'commander',
    'discord.js',
    'fs/promises',
    '@prisma/client',
  ],
})
await writer('./dist/index.cjs')
