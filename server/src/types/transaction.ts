export type UUID = string;

export interface DepositInput {
  idempotencyKey: UUID,
  amount_in_cents: number,
  account_id: string,
}

export interface WithdrawInput {
  idempotencyKey: UUID,
  amount_in_cents: number,
  account_id: string,
}

export interface TransferInput {
  idempotencyKey: UUID,
  amount_in_cents: number,
  description: string,
  sender_account_id: string,
  receiver_account_id: string,
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
