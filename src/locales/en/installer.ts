import { installerParams, installerSubParams } from '../localeParams'

export const installerEN: installerParams = [
  ') Upgrade - Update/Downgrade Solana Version',
  ') Check Validator Status or Start/Stop',
  ') Get Validator Config Info',
  ') Backup/Restore/Create Validator Keyfiles',
  ') Migrate to solv3',
  ') Uninstall',
  ') Exit',
]

export const installerSubEN: installerSubParams = [
  [],
  [
    ') Check Validator Status',
    ') Start Validator',
    ') Stop Validator',
    ') Restart Validator (no fetch snapshot)',
    ') Restart Validator (fetch snapshot)',
    ') Return to Main Menu',
  ],
  [
    ') Show Validator Config',
    ') Show Validator Keys',
    ') Get Current Epoch/Slot',
    ') Get Solana Validator Catchup Info',
    ') Get Solana Validator Monitor Info',
    ') Return to Main Menu',
  ],
  [
    ') Backup Validator Keyfiles',
    ') Restore Validator Keyfiles',
    ') Create Validator Keyfiles',
    ') Return to Main Menu',
  ],
  [],
  [],
  [],
]
