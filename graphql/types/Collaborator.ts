// /graphql/types/User.ts
import { extendType, nonNull, objectType, stringArg } from 'nexus'
import { Project } from './Project'
import { CollaboratorType } from './CollaboratorType'

export const Collaborator = objectType({
  name: 'Collaborator',
  definition(t) {
    t.string('id')
    t.string('name')
    t.string('lastName')
    t.string('avatar')
    t.string('phone')
    t.string('email')
    t.string('address')
    t.string('typeId')
    t.list.field('projects', {
        type: Project,
        async resolve(_parent, _args, ctx) {
          return await ctx.prisma.collaborator
            .findMany({
              where: {
                id: _parent.id,
              },
            })
        },
      })
      t.field('collaboratorType', {
        type: CollaboratorType,
        /*@ts-ignore*/
        async resolve(_parent, _args, ctx) {
          return await ctx.prisma.collaboratorType
            .findFirst({
              where: {
                id: _parent.typeId,
              },
            })
        },
      })
      
  },
})


export const CollaboratorsQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.field('collaborator', {
      type: 'Collaborator',
      resolve(_parent, _args, ctx) {
        return ctx.prisma.collaborator.findMany()
      },
    })
  },
})

export const CreateCollaboratorMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('createCollaborator', {
      type: Collaborator,
      args: {
        name: nonNull(stringArg()),
        lastName: nonNull(stringArg()),
        phone: nonNull(stringArg()),
        email: nonNull(stringArg()),
        address: nonNull(stringArg()),
      },
      async resolve(_parent, args, ctx) {

        if (!ctx.user) {
          throw new Error(`You need to be logged in to perform an action`)
        }

        const newCollaborator = {
          name: args.name,
          lastName: args.lastName,
          phone: args.phone,
          email: args.email,
          address: args.address,
        }

        return await ctx.prisma.collaborator.create({
          //@ts-ignore
          data: newCollaborator,
        })
      },
    })
  },
})

