export type UUID = string

export interface DepositInput {
  idempotencyKey: UUID,
  amount_in_cents: number,
}

export interface WithdrawInput {
  idempotencyKey: UUID,
  amount_in_cents: number,
}

export interface TransferInput {
  idempotencyKey: UUID,
  amount_in_cents: number,
  description: string,
  receiver_account_key: string,
}

export interface GetTransactionsInput {
  first?: number,
  last?: number,
  before?: string,
  after?: string
}

export interface ITransaction {
  _id: UUID,
  type: string,
  amount_in_cents: number,
  timestamp: string,
  description: string,
  sender_account_id: string,
  receiver_account_id: string,
}

export interface Context {
  token?: string
}
