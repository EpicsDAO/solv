import { spawn } from 'child_process'
import { readFileSync } from 'fs'
import { Readable } from 'stream'
import { SingleBar } from 'cli-progress'

export const search = async (bar: SingleBar): Promise<string[]> => {
  return new Promise((resolve, reject) => {
    try {
      const find = spawn('find', ['/', '-name', '*.json', '-size', '-301c'])
      const filePaths: string[] = []
      find.stdout.on('data', (data) => {
        filePaths.push(
          ...data
            .toString()
            .split('\n')
            .filter((path: string) => path)
        )
        bar.increment()
      })

      find.stderr.on('data', (data) => {
        bar.increment()
        //console.error(`Error: ${data}`)
      })

      find.on('close', (code) => {
        if (code === 0) {
          resolve(filePaths)
        } else {
          resolve(filePaths)
        }
      })
    } catch (error) {
      reject(`search Error: ${error}`)
    }
  })
}

const checkIfSolanaKey = (path: string): boolean => {
  try {
    const content = JSON.parse(readFileSync(path, 'utf-8'))
    return content.length === 64
  } catch (error) {
    return false
  }
}

export const processPaths = async (
  paths: string[],
  bar: SingleBar
): Promise<string[]> => {
  const validPaths: string[] = []
  const readable = Readable.from(paths)
  readable.on('data', async (path) => {
    if (checkIfSolanaKey(path)) {
      validPaths.push(path)
    }
  })

  return new Promise((resolve, reject) => {
    readable.on('end', () => {
      resolve(validPaths)
    })

    readable.on('error', (error) => {
      reject(error)
    })
  })
}
