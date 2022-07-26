// /graphql/types/User.ts
import { extendType, objectType } from 'nexus'
import { Project } from './Project'
import { Task } from './Task'

export const Collaborator = objectType({
  name: 'Collaborator',
  definition(t) {
    t.string('id')
    t.string('name')
    t.string('lastName')
    t.string('avatar')
    t.list.field('projects', {
        type: Project,
        async resolve(_parent, _args, ctx) {
          return await ctx.prisma.collaborator
            .findUnique({
              where: {
                id: _parent.id,
              },
            })
            .projects()
        },
      })
      t.list.field('tasks', {
        type: Task,
        async resolve(_parent, _args, ctx) {
          return await ctx.prisma.collaborator
            .findUnique({
              where: {
                id: _parent.id,
              },
            })
            .tasks()
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
