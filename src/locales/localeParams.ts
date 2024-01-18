export interface LocaleParams {
  cmds: DescriptionParams
  subCmds: subCommandParams
  installer: string[]
  logs: LogParams
}

export interface DescriptionParams {
  description: string
  version: string
  help: string
  subcmdHelp: string
  server: string
  start: string
  stop: string
  status: string
  restart: string
  update: string
  get: string
  log: string
  catchup: string
  monitor: string
  config: string
  install: string
  stake: string
  check: string
  scp: string
  cron: string
  setup: string
  epoch: string
  slot: string
  solv: string
  installer: string
}

export interface subCommandParams {
  server: Description
  start: Description
  stop: Description
  status: Description
  restart: Description
  update: Description
  get: Description
  log: Description
  catchup: Description
  monitor: Description
  config: Description
  install: Description
  stake: Description
  check: Description
  scp: Description
  cron: Description
  setup: Description
  epoch: Description
  slot: Description
  solv: Description
}

export interface LogParams {
  success: {
    created: string
  }
  error: {
    failed: string
  }
  installer: {
    welcomeMsg: string
    description: string
  }
}

export interface Description {
  description: string
}
