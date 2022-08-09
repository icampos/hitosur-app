// /graphql/types/User.ts
import { extendType, objectType } from 'nexus'
import { Project } from './Project'
import { CollaboratorType } from './CollaboratorType'

export const Collaborator = objectType({
  name: 'Collaborator',
  definition(t) {
    t.string('id')
    t.string('name')
    t.string('lastName')
    t.string('avatar')
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
