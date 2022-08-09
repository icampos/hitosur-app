import { asNexusMethod } from 'nexus'

import {
    GraphQLDate,
} from 'graphql-iso-date'

export const GQLDate = asNexusMethod(GraphQLDate, 'date')