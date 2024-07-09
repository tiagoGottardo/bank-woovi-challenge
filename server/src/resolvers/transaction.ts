import { DepositInput, WithdrawInput, TransferInput, Context } from '../types/transaction'

import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'other-secret'

const authenticate = (token: string | undefined) => {
  if (token) {
    try {
      return jwt.verify(token, JWT_SECRET) as { email: string };
    } catch (e) {
      return null;
    }
  }

  return null
}

export default {
  Query: {
    getTransactions: async (_: any, __: any, context: Context) => {
    },
  },
  Mutation: {
    deposit: async (_: undefined, args: DepositInput, context: Context) => {

    },
    transfer: async (_: undefined, args: TransferInput, context: any) => {
    },
    withdraw: async (_: undefined, args: WithdrawInput, context: any) => {
    },
  }
}
