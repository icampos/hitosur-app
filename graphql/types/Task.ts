// /graphql/types/User.ts
import { extendType, objectType } from 'nexus'
import { Project } from './Project'
import { Collaborator } from './Collaborator'

export const Task = objectType({
  name: 'Task',
  definition(t) {
    t.string('id')
    t.string('name')
    t.string('location')
    t.field('project', {
        type: Project,
        async resolve(_parent, _args, ctx) {
          return await ctx.prisma.task
            .findUnique({
              where: {
                id: _parent.id,
              },
            })
            //@ts-ignore
            .project()
        },
      })
      t.list.field('collaborator', {
        type: Collaborator,
        async resolve(_parent, _args, ctx) {
          return await ctx.prisma.task
            .findUnique({
              where: {
                id: _parent.id,
              },
            })
            //@ts-ignore
            .collaborator()
        },
      })
  },
})


export const TasksQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.field('tasks', {
      type: 'Task',
      resolve(_parent, _args, ctx) {
        return ctx.prisma.task.findMany()
      },
    })
  },
})