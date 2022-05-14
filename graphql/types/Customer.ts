// /graphql/types/User.ts
import { extendType, objectType } from 'nexus'
import { Project } from './Project'
 
export const Customer = objectType({
  name: 'Customer',
  definition(t) {
    t.string('id')
    t.string('email')
    t.string('name')
    t.string('lastName')
    t.string('enabled')
    t.list.field('projects', {
        type: Project,
        async resolve(_parent, _args, ctx) {
          return await ctx.prisma.customer
            .findUnique({
              where: {
                id: _parent.id,
              },
            })
            .projects()
        },
      })
  },
})


export const CustomersQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.field('customers', {
      type: 'Customer',
      resolve(_parent, _args, ctx) {
        return ctx.prisma.customer.findMany()
      },
    })
  },
})
