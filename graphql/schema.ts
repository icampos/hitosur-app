// graphql/schema.ts

/*import { gql } from 'apollo-server-micro'

export const typeDefs = gql`
  type User {
    id: String
    createdAt: String
    updatedAt: String
    email: String
    image: String
    role: String
  }

  type Query {
    users: [User]!
  }
`*/

// /graphql/schema.ts
import { makeSchema } from 'nexus'
import { join } from 'path'
import * as types from './types'


export const schema = makeSchema({
  types,
  outputs: {
    typegen: join(process.cwd(), 'node_modules', '@types', 'nexus-typegen', 'index.d.ts'),
    schema: join(process.cwd(), 'graphql', 'schema.graphql'),
  },
  contextType: {
    export: 'Context',
    module: join(process.cwd(), 'graphql', 'context.ts'),
  },
})