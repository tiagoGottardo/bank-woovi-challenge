import Account from '../models/Account'
import { CreateAccountInput, LoginAccountInput } from '../types/account'

import { z } from 'zod'
import accountZodSchema, { accountKeySchema } from './accountZodSchema'

import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

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
    me: async () => {
      return "me"
      // return Account.findOne({ username: user.username })
    },
  },
  Mutation: {
    updateAccountKey: async (_: undefined, args: any, context: any) => {
      const emailAccount = authenticate(context?.token)?.email
      if (!emailAccount) {
        throw Error("Token is not valid!")
      }

      const { account_key } = args

      try {
        accountKeySchema.parse(account_key)

        const existingAccount = await Account.findOne({ account_key });
        console.log("ec ", existingAccount)
        if (existingAccount) {
          throw new Error('an account already uses that key.');
        }
        console.log(emailAccount)
        console.log(account_key)

        await Account.updateOne(
          { email: emailAccount },
          { $set: { account_key } }
        )

        return "Account key updated succesfully."
      } catch (e) {
        if (e instanceof z.ZodError) {
          console.error('Validation error:', e.errors[0].message);
          return e.errors[0].message
        }
        throw new Error('Failed to update account key, ' + (e as Error).message);
      }
    },
    login: async (_: undefined, args: LoginAccountInput) => {
      const { email, password } = args
      const account = await Account.findOne({ email })
      if (!account) {
        throw new Error('Account not found');
      }

      const valid = await bcrypt.compare(password, account.password)
      if (!valid) {
        throw new Error('Invalid password');
      }

      return jwt.sign({ email }, JWT_SECRET, { expiresIn: '1h' })
    },
    register: async (_: undefined, args: CreateAccountInput) => {
      try {
        accountZodSchema.parse(args)
        console.table(args)

        const { email, cpf, account_key, name, password, date_of_birth } = args

        const existingAccount = await Account.findOne({
          $or: [
            { email },
            { cpf },
            { account_key }
          ]
        });

        if (existingAccount) {
          if (existingAccount.email === email) {
            throw new Error('An account already uses that email.');
          } else if (existingAccount.cpf === cpf) {
            throw new Error('An account already has that CPF.');
          } else {
            throw new Error('An account already uses that key.');
          }
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const account = new Account({
          name,
          email,
          cpf,
          account_key,
          date_of_birth,
          password: hashedPassword,
        })
        await account.save()

        return jwt.sign({ email }, JWT_SECRET, { expiresIn: '1h' })
      } catch (e) {
        if (e instanceof z.ZodError) {
          console.error('Validation error:', e.errors[0].message);
          return e.errors[0].message
        }

        console.error(e);
        throw new Error('Failed to create account, ' + (e as Error).message);
      }
    },
  },
}
