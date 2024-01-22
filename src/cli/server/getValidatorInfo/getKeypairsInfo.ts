import { SOLV_TYPES, getAllKeyPaths } from '@/config/config'
import { getSolBalance } from '@/lib/getSolBalance'
import { getSolanaAddress } from '@/lib/getSolanaAddress'

export const getKeypairsInfo = (solvType: SOLV_TYPES) => {
  const keypairs = getAllKeyPaths()
  switch (solvType) {
    case SOLV_TYPES.TESTNET_VALIDATOR:
      return {
        validatorKey: keypairs.testnetValidatorKey,
        validatorKeyAddress: getSolanaAddress(keypairs.testnetValidatorKey),
        validatorKeyBalance: getSolBalance(keypairs.testnetValidatorKey),
        voteKey: keypairs.testnetValidatorVoteKey,
        voteKeyAddress: getSolanaAddress(keypairs.testnetValidatorVoteKey),
        voteKeyBalance: getSolBalance(keypairs.testnetValidatorVoteKey),
        authorityKey: keypairs.testnetValidatorAuthorityKey,
        authorityKeyAddress: getSolanaAddress(
          keypairs.testnetValidatorAuthorityKey,
        ),
        authorityKeyBalance: getSolBalance(
          keypairs.testnetValidatorAuthorityKey,
        ),
      }
    case SOLV_TYPES.MAINNET_VALIDATOR:
      return {
        validatorKey: keypairs.mainnetValidatorKey,
        validatorKeyAddress: getSolanaAddress(keypairs.mainnetValidatorKey),
        validatorKeyBalance: getSolBalance(keypairs.mainnetValidatorKey),
        voteKey: keypairs.mainnetValidatorVoteKey,
        voteKeyAddress: getSolanaAddress(keypairs.mainnetValidatorVoteKey),
        voteKeyBalance: getSolBalance(keypairs.mainnetValidatorVoteKey),
        authorityKey: keypairs.mainnetValidatorAuthorityKey,
        authorityKeyAddress: getSolanaAddress(
          keypairs.mainnetValidatorAuthorityKey,
        ),
        authorityKeyBalance: getSolBalance(
          keypairs.mainnetValidatorAuthorityKey,
        ),
      }
    case SOLV_TYPES.RPC_NODE:
      return {
        validatorKey: keypairs.mainnetValidatorKey,
        validatorKeyAddress: getSolanaAddress(keypairs.mainnetValidatorKey),
        validatorKeyBalance: getSolBalance(keypairs.mainnetValidatorKey),
      }
  }
}
