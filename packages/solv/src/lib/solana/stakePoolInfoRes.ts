import { PublicKey } from '@solana/web3.js'

export type Validator = {
  activeStakeLamports: string
  transientStakeLamports: string
  lastUpdateEpoch: string
  transientSeedSuffixStart: string
  transientSeedSuffixEnd: string
  status: string
  voteAccountAddress: string
}

export type StakeAccount = {
  voteAccountAddress: string
  stakeAccountAddress: string
  validatorActiveStakeLamports: string
  validatorLastUpdateEpoch: string
  validatorLamports: string
  validatorTransientStakeAccountAddress: string
  validatorTransientStakeLamports: string
  updateRequired: boolean
}

export type Details = {
  reserveStakeLamports: number | undefined
  reserveAccountStakeAddress: string
  minimumReserveStakeBalance: number
  stakeAccounts: StakeAccount[]
  totalLamports: any
  totalPoolTokens: number
  currentNumberOfValidators: number
  maxNumberOfValidators: number
  updateRequired: boolean
}

export type StakePoolInfoRes = {
  address: string
  poolWithdrawAuthority: string
  manager: string
  staker: string
  stakeDepositAuthority: string
  stakeWithdrawBumpSeed: number
  maxValidators: number
  validatorList: Validator[]
  validatorListStorageAccount: string
  reserveStake: string
  poolMint: string
  managerFeeAccount: string
  tokenProgramId: string
  totalLamports: string
  poolTokenSupply: string
  lastUpdateEpoch: string
  lockup: any
  epochFee: any
  nextEpochFee: any | undefined
  preferredDepositValidatorVoteAddress: PublicKey | undefined
  preferredWithdrawValidatorVoteAddress: PublicKey | undefined
  stakeDepositFee: any
  stakeWithdrawalFee: any
  nextStakeWithdrawalFee: any | undefined
  stakeReferralFee: number
  solDepositAuthority: string | undefined
  solDepositFee: any
  solReferralFee: number
  solWithdrawAuthority: string | undefined
  solWithdrawalFee: any
  nextSolWithdrawalFee: any | undefined
  lastEpochPoolTokenSupply: string
  lastEpochTotalLamports: string
  details: Details
}
