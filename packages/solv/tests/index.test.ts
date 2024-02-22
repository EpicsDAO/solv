// tests/cli.test.ts
import { describe, it, expect } from 'vitest'
import { exec } from 'child_process'
import util from 'util'

const execPromise = util.promisify(exec)

describe('CLI app', () => {
  it('should include Solana Validator All-in-One CLI', async () => {
    // Run the CLI with the help command
    const command = 'node ./dist/index.js help'
    const { stdout, stderr } = await execPromise(command)

    // stderr should be empty
    expect(stderr).toBe('')

    // stdout includes 'Solana Validator All-in-One CLI'
    expect(stdout.trim()).include('Solana Validator All-in-One CLI')
  })
})
