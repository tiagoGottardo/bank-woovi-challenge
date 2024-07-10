import { AccountModel } from '../models/Account'
import { CreateAccountInput, LoginAccountInput } from '../types/account'

import { z } from 'zod'
import { accountKeySchema, accountSchema } from './zodSchemas'

import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

import { GraphQLContext } from 'modules/graphql/types'
import { config } from '../config'

export default {
  Query: {
    me: async (_: any, __: any, context: GraphQLContext) => {
      const { account } = context
      if (!account) {
        throw Error("Token invalid")
      }

      return await AccountModel.findOne({ _id: account._id })
    },
  },
  Mutation: {
    updateAccountKey: async (_: undefined, args: any, context: GraphQLContext) => {
      const { account } = context
      const { account_key } = args

      if (!account) { return "Token is not valid!" }

      try {
        accountKeySchema.parse(account_key)

        const existingAccount = await AccountModel.findOne({ account_key })
        if (existingAccount) { return 'an account already uses that key.' }

        account.account_key = account_key
        await account.save()

        return "Account key updated succesfully."
      } catch (e) {
        if (e instanceof z.ZodError) {
          return e.errors[0].message
        }
        return 'Failed to update account key, ' + (e as Error).message
      }
    },
    deleteAccount: async (_: any, args: any, context: GraphQLContext) => {
      const { account } = context
      if (!account) { return "Token is not valid!" }

      const { password } = args

      const valid = await bcrypt.compare(password, account.password)
      if (!valid) { return 'Invalid password' }

      if (account.balance_in_cents !== 0) {
        return 'Balance is positive, it must be 0. Withdraw all your money and try again.'
      }

      await account.deleteOne()

      return "Account deleted succesfully."
    },
    login: async (_: undefined, args: LoginAccountInput) => {
      const { email, password } = args

      const account = await AccountModel.findOne({ email })
      if (!account) { return 'Account not found' }

      const valid = await bcrypt.compare(password, account.password)
      if (!valid) { return 'Invalid password' }

      return jwt.sign({ id: account._id }, config.JWT_SECRET, { expiresIn: '1d' })
    },
    register: async (_: undefined, args: CreateAccountInput) => {
      try {
        const { email, cpf, account_key, name, password, date_of_birth } = accountSchema.parse(args)

        const existingAccount = await AccountModel.findOne({
          $or: [
            { email },
            { cpf },
            { account_key }
          ]
        })

        if (existingAccount) {
          if (existingAccount.email === email) {
            return 'an account already uses that email.'
          } else if (existingAccount.cpf === cpf) {
            return 'an account already has that CPF.'
          } else {
            return 'an account already uses that key.'
          }
        }

        const account = new AccountModel({
          name,
          email,
          cpf,
          account_key,
          date_of_birth,
          password,
        })
        await account.save()

        return jwt.sign({ id: account._id }, config.JWT_SECRET, { expiresIn: '1d' })
      } catch (e) {
        if (e instanceof z.ZodError) {
          return ('Validation error:' + e.errors[0].message)
        }

        return 'Failed to create account, ' + (e as Error).message
      }
    },
  },
}
