export type UbuntuDhParams = {
  Filesystem: string
  Size: string
  Used: string
  Avail: string
  Use: string
  MountedOn: string
}

export type ReleaseType = 'jammy' | 'focal'

export module SolvPaths {
  export const CHANGE_LOG_PATH = './solv-debian/debian/changelog'
  export const DEFAULT_FILE_SYSTEM = '/dev/nvme1n1'
}
