import { Connection } from '@solana/web3.js'

export type ValidatorStatus = {
  pubkey: string
  isActive: boolean
  reason: string
}

export const isValidatorActive = async (
  rpcUrl: string,
  voteAccountKey: string,
  isTest = false,
  slot = 200,
) => {
  let validatorStatus: ValidatorStatus = {
    pubkey: voteAccountKey,
    isActive: false,
    reason: '',
  }
  try {
    const connection = isTest
      ? new Connection('https://api.testnet.solana.com')
      : new Connection(rpcUrl, 'confirmed')
    let voteAccounts = await connection.getVoteAccounts()
    let validator = voteAccounts.current.find(
      (v) => v.votePubkey === voteAccountKey,
    )

    if (!validator) {
      // Validator is not in the current list, it might be delinquent.
      const delinquentValidator = voteAccounts.delinquent.find(
        (v) => v.votePubkey === voteAccountKey,
      )
      if (delinquentValidator) {
        validatorStatus.isActive = false
        validatorStatus.reason = 'Validator is delinquent.'
        return validatorStatus
      } else {
        validatorStatus.isActive = false
        validatorStatus.reason =
          'Validator is not found in both current and delinquent lists.'
        return validatorStatus
      }
    }
    // Refetch the validator from the current list.
    voteAccounts = await connection.getVoteAccounts()
    validator = voteAccounts.current.find(
      (v) => v.votePubkey === voteAccountKey,
    )
    if (!validator) {
      validatorStatus.isActive = false
      validatorStatus.reason = 'Validator is not found in the current list.'
      return validatorStatus
    }

    // Check the last vote timestamp.
    const lastVoteSlot = validator.lastVote
    const currentSlot = await connection.getSlot()
    const slotsSinceLastVote = currentSlot - lastVoteSlot
    if (slotsSinceLastVote > slot) {
      // This is an arbitrary number, adjust based on your needs.
      validatorStatus.isActive = false
      validatorStatus.reason = `Validator has not voted for ${slotsSinceLastVote} slots.`
      return validatorStatus
    }

    validatorStatus.isActive = true
    validatorStatus.reason = 'Validator is active and voting.'
    return validatorStatus
  } catch (error) {
    console.error(error)
    validatorStatus.isActive = false
    validatorStatus.reason = 'Failed to check validator status.'
    return validatorStatus
  }
}
