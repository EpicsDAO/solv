import { spawnSync } from 'child_process'
import fs from 'fs/promises'

const writer = async (file: string) => {
  try {
    const currentFile = await fs.readFile(file)
    const currentFileString = String(currentFile)
    await fs.writeFile(file, '#!/usr/bin/env node\n', { flag: 'w' })
    await fs.appendFile(file, currentFileString)
  } catch (e) {
    console.log(e)
  }
}

const cmd = `cp ./dist/index.js solv-debian/usr/share/solv/index.js`
spawnSync(cmd, { shell: true, stdio: 'inherit' })

writer('./dist/index.js')
