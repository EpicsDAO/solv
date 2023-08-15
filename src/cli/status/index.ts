import { program } from '@/index'

export const statusCommands = () => {
  program.command('status').description('solv Status Command')
}
