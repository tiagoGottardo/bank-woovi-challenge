import app from './app'
import { config } from './config'

import { connectDatabase } from './database'

await connectDatabase()

app.listen(config.PORT, () => {
  console.log(`Server is running on http://localhost:${config.PORT}/graphql`)
})
