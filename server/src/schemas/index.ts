import { loadFilesSync } from '@graphql-tools/load-files'
import { mergeTypeDefs } from '@graphql-tools/merge'

import { fileURLToPath } from 'node:url'
import path from 'node:path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const schemasPath = path.join(__dirname, './*.graphql')

const typeDefsArray = loadFilesSync(schemasPath, { extensions: ['graphql'] })

const typeDefs = mergeTypeDefs(typeDefsArray)

export default typeDefs
