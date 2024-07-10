import jwt from 'jsonwebtoken'

import { Account, AccountModel } from './modules/account/AccountModel'
import { config } from './config'

export const getAccountByToken = async (token: string | null | undefined) => {
  if (token) {
    try {
      const decoded = jwt.verify(token, config.JWT_SECRET)

      const account = await AccountModel.findOne({
        _id: (decoded as { id: string }).id,
      })

      return { account }
    } catch (e) {
      return { account: null }
    }
  }

  return { account: null }
}

export const generateJwtToken = (account: Account) => {
  return jwt.sign({ id: account._id }, config.JWT_SECRET)
}
