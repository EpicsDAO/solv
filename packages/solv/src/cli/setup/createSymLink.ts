import { spawnSync } from 'child_process'

export const createSymLink = (isDummy = false) => {
  if (isDummy) {
    createInactiveSymLink()
  } else {
    createActiveSymLink()
  }
}

export const createActiveSymLink = () => {
  spawnSync(
    `ln -sf /home/solv/mainnet-validator-keypair.json /home/solv/identity.json`,
    { shell: true, stdio: 'inherit' },
  )
}

export const createInactiveSymLink = () => {
  spawnSync(
    `ln -sf /home/solv/unstaked-identity.json /home/solv/identity.json`,
    { shell: true, stdio: 'inherit' },
  )
}
