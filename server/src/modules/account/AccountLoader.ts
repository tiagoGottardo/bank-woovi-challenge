import { createLoader } from '@entria/graphql-mongo-helpers'

import { registerLoader } from '../loader/loaderRegister'
import { AccountModel } from './AccountModel'

const {
  Wrapper: Account,
  getLoader,
  clearCache,
  load,
  loadAll,
} = createLoader({
  model: AccountModel,
  loaderName: 'AccountLoader',
})

export { getLoader, clearCache, load, loadAll }
export default Account

registerLoader('AccountLoader', getLoader)
