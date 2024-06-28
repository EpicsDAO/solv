import { appendFile, readFile, writeFile } from 'fs/promises'

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

writer('./dist/index.js')
